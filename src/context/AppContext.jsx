import { createContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

export const initialInvoiceData = {
  title: "Create Invoice",
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", phone: "", address: "" },
  tax: 0,
  notes: "",
  items: [{ name: "", qty: "", amount: "", description: "", total: 0 }],
  logo: "",
};

export const AppContextProvider = (props) => {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [invoiceTitle, setInvoiceTitle] = useState("Create Invoice");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isPremium, setIsPremium] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const { getToken, isSignedIn } = useAuth();
  const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchSubscription = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${baseURL}/subscription/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsPremium(data.subscriptionType === "PREMIUM");
      } catch (e) {
        console.error("Failed to fetch subscription status", e);
      } finally {
        setIsUserLoaded(true);
      }
    };
    fetchSubscription();
  }, [isSignedIn]);

  const contextValue = {
    baseURL,
    invoiceData,
    setInvoiceData,
    invoiceTitle,
    setInvoiceTitle,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    isPremium,
    setIsPremium,
    isUserLoaded,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};