import { createContext, useState } from "react";

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

  const baseURL = "http://localhost:8080/api";

  const contextValue = {
    baseURL,
    invoiceData,
    setInvoiceData,
    invoiceTitle,
    setInvoiceTitle,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
