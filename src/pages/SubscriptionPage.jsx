import { useState, useEffect, useContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import UpgradeToPremiumModal from "../components/UpgradeToPremiumModal";
import { AppContext } from "../context/AppContext";

const SubscriptionPage = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsPremium, baseURL } = useContext(AppContext);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${baseURL}/subscription/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSubscriptionData(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCanceling(true);

    try {
      const token = await getToken();
      const response = await fetch(`${baseURL}/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        toast.success('Subscription cancelled successfully');
        setShowCancelModal(false);
        fetchSubscriptionStatus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setCanceling(false);
    }
  };

  const handleUpgradeSuccess = () => {
    setShowUpgradeModal(false);
    setIsPremium(true);
    fetchSubscriptionStatus();
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
        <p className="mt-3">Loading subscription details...</p>
      </div>
    );
  }

  const isPremium = subscriptionData?.subscriptionType === 'PREMIUM';

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Subscription Management</h2>

          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Current Plan</h5>
                <span className={`badge ${isPremium ? 'bg-warning text-dark' : 'bg-secondary'} px-3 py-2`}>
                  {isPremium ? 'Premium' : 'Free'}
                </span>
              </div>

              {isPremium ? (
                <>
                  <p className="text-muted mb-3">
                    You have access to all premium features including 10+ exclusive invoice templates.
                  </p>
                  
                  <div className="border-top pt-3 mt-3">
                    <h6 className="mb-3">Premium Features:</h6>
                    <ul className="list-unstyled">
                      <li className="mb-2">Access to 10+ premium templates</li>
                      <li className="mb-2">Exclusive professional designs</li>
                      <li className="mb-2">Priority support</li>
                      <li className="mb-2">Early access to new features</li>
                    </ul>
                  </div>

                  <div className="border-top pt-3 mt-3">
                    <p className="mb-2"><strong>Price:</strong> $1.99/month</p>
                    <p className="mb-0 text-muted small">Your subscription will automatically renew monthly</p>
                  </div>

                  <div className="mt-4">
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => setShowCancelModal(true)}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-muted mb-3">
                    You are currently on the free plan with access to 5 basic templates.
                  </p>

                  <div className="border-top pt-3 mt-3">
                    <h6 className="mb-3">Upgrade to Premium to unlock:</h6>
                    <ul className="list-unstyled">
                      <li className="mb-2">Access to 10+ premium templates</li>
                      <li className="mb-2">Exclusive professional designs</li>
                      <li className="mb-2">Priority support</li>
                      <li className="mb-2">Early access to new features</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button 
                      className="btn btn-warning"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      Upgrade to Premium - $1.99/month
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {isPremium && (
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-3">Billing Information</h5>
                <p className="text-muted mb-2">
                  Your subscription is managed through Stripe. 
                </p>
                <p className="text-muted small mb-0">
                  Need to update your payment method? Contact support at support@quickinvoice.com
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <UpgradeToPremiumModal 
        show={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onSuccess={handleUpgradeSuccess}
      />

      {showCancelModal && (
        <div 
          className="modal d-block" 
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-danger">Cancel Premium Subscription?</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCancelModal(false)}
                  disabled={canceling}
                ></button>
              </div>
              
              <div className="modal-body">
                <div className="alert alert-warning mb-3">
                  <strong>Warning:</strong> If you cancel, you will lose access to:
                </div>
                
                <ul className="list-unstyled mb-4">
                  <li className="mb-2 text-danger">❌ 10+ premium invoice templates</li>
                  <li className="mb-2 text-danger">❌ Exclusive professional designs</li>
                  <li className="mb-2 text-danger">❌ Priority support</li>
                  <li className="mb-2 text-danger">❌ Early access to new features</li>
                </ul>

                <div className="bg-light p-3 rounded mb-3">
                  <p className="mb-2 small"><strong>Current Plan:</strong> Premium ($1.99/month)</p>
                  <p className="mb-0 small"><strong>After Cancellation:</strong> Free (5 basic templates only)</p>
                </div>

                <p className="text-muted small mb-0">
                  Your premium access will end immediately after cancellation. 
                  You can re-subscribe anytime.
                </p>
              </div>

              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                  disabled={canceling}
                >
                  Keep Premium
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                >
                  {canceling ? (
                    <>
                      <Loader2 size={18} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                      Cancelling...
                    </>
                  ) : (
                    'Yes, Cancel Subscription'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;