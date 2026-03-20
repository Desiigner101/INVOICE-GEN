import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import UpgradeToPremiumModal from "./UpgradeToPremiumModal";
import { useNavigate, useLocation } from "react-router-dom";

const SubscriptionBadge = () => {
  const { getToken } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState("FREE");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchSubscriptionStatus = async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:8080/api/subscription/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSubscriptionType(data.subscriptionType);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [getToken, location.pathname]); // Re-fetch when route changes

  const handleUpgradeSuccess = () => {
    setShowUpgradeModal(false);
    setSubscriptionType("PREMIUM");
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {subscriptionType === "PREMIUM" ? (
        <span className="badge bg-warning text-dark px-3 py-2">
          Premium
        </span>
      ) : (
        <button 
          className="btn btn-sm btn-outline-warning"
          onClick={() => setShowUpgradeModal(true)}
        >
          Upgrade to Premium
        </button>
      )}

    </>
  );
};

export default SubscriptionBadge;