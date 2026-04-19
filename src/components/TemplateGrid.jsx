import { useState, useEffect } from "react";
import { templates } from "../assets/assets.js";
import { useAuth } from "@clerk/clerk-react";
import UpgradeToPremiumModal from "./UpgradeToPremiumModal";
import { toast } from "react-hot-toast";

const TemplateGrid = ({ onTemplateClick }) => {
  const { getToken } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState("FREE");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setSubscriptionType(data.subscriptionType);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };
    fetchSubscriptionStatus();
  }, [getToken]);

  const handleTemplateClick = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template.tier === "PREMIUM" && subscriptionType === "FREE") {
      setSelectedTemplateId(templateId);
      setShowUpgradeModal(true);
      toast.error("This is a premium template. Upgrade to unlock! 👑");
    } else {
      onTemplateClick(templateId);
    }
  };

  const handleUpgradeSuccess = () => {
    setShowUpgradeModal(false);
    setSubscriptionType("PREMIUM");
    if (selectedTemplateId) {
      onTemplateClick(selectedTemplateId);
      setSelectedTemplateId(null);
    }
  };

  return (
    <>
      <div className="row g-3">
        {templates.map(({ id, label, image, tier }) => {
          const isPremium = tier === "PREMIUM";
          const isLocked = isPremium && subscriptionType === "FREE";

          return (
            <div key={id} className="col-12 col-sm-6 col-lg-4">
              <div
                onClick={() => handleTemplateClick(id)}
                className="border rounded shadow-sm overflow-hidden template-hover cursor-pointer position-relative"
                title={label}
                style={{ opacity: isLocked ? 0.7 : 1 }}
              >
                {isPremium && (
                  <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 2 }}>
                    <span className="badge bg-warning text-dark">👑 Premium</span>
                  </div>
                )}
                {isLocked && (
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ background: 'rgba(0,0,0,0.4)', zIndex: 1 }}
                  >
                    <div className="text-center text-white">
                      <div style={{ fontSize: '3rem' }}>🔒</div>
                      <p className="mb-0 mt-2 fw-bold">Premium Only</p>
                    </div>
                  </div>
                )}
                <img src={image} alt={label} className="w-100" loading="lazy" />
                <div className="p-2 text-center fw-medium">{label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <UpgradeToPremiumModal 
        show={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onSuccess={handleUpgradeSuccess}
      />
    </>
  );
};

export default TemplateGrid;