import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      const token = await getToken();
      const response = await fetch('http://localhost:8080/api/subscription/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id
        })
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        toast.success('Successfully upgraded to Premium!');
        
        // Wait for backend to update before refreshing UI
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border rounded p-3 mb-3" style={{ background: '#fff' }}>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary d-flex align-items-center"
          disabled={!stripe || loading}
        >
          {loading ? (
            <>
              <Loader2 className="me-2" size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Processing...
            </>
          ) : (
            'Pay $1.99/month'
          )}
        </button>
      </div>
    </form>
  );
};

const UpgradeToPremiumModal = ({ show, onClose, onSuccess }) => {
  if (!show) return null;

  return (
    <div 
      className="modal d-block" 
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title mb-1">Upgrade to Premium</h5>
              <p className="text-muted mb-0 small">Unlock 10+ premium invoice templates</p>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          
          <div className="modal-body">
            {/* Features List */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Premium Features:</h6>
              <ul className="list-unstyled">
                <li className="mb-2">Access to 10+ premium templates</li>
                <li className="mb-2">Exclusive professional designs</li>
                <li className="mb-2">Priority support</li>
                <li className="mb-2">Early access to new features</li>
              </ul>
              
              {/* Pricing */}
              <div className="p-3 rounded bg-light text-center border border-primary mt-3">
                <h3 className="mb-0 text-primary">
                  $1.99<span className="fs-6 text-muted">/month</span>
                </h3>
                <p className="text-muted small mb-0">Cancel anytime</p>
              </div>
            </div>

            <h6 className="fw-bold mb-3">Payment Details:</h6>
            
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={onSuccess} onCancel={onClose} />
            </Elements>

            <p className="text-muted small mt-3 mb-0 text-center">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToPremiumModal;