import { useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { saveInvoice, sendInvoice } from "../service/invoiceService.js";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import {Loader2} from "lucide-react"
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import html2canvas from "html2canvas";
import { deleteInvoice } from "../service/invoiceService.js";
import { generatePdfFromElement } from "../utils/pdfUtils";
import { useAuth, useUser } from "@clerk/clerk-react";

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL, setInvoiceData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false); 
    const [showModal, setShowModal] = useState(false);

    const [customerEmail, setCustomerEmail] = useState(""); 
    const [emailing, setEmailing] = useState(false);

    const { getToken } = useAuth();
    const {user} = useUser();


    const handleSaveAndExit = async() => {
        try{
            setLoading(true);
            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY,
            });

            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
            const payload = {
                ...invoiceData,
                clerkId: user.id,
                thumbnailUrl,
                template: selectedTemplate,
            };

            const token = await getToken();
            const response  = await saveInvoice(baseURL, payload, token);
            if(response.status === 200){
                setInvoiceData(response.data);

                toast.success("Invoice saved successfully.");
                navigate("/dashboard");
            }else{
                toast.error("Something went wrong while saving the invoice.");
            }
        }catch(error){
            toast.error("Failed to save invoice.");
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async () => {
    // Check if invoice has an ID
    if (!invoiceData.id) {
        toast.error("Cannot delete unsaved invoice. Please save first.");
        return;
    }

    try {
        const token = await getToken();
        
        // Log for debugging
        console.log("Deleting invoice ID:", invoiceData.id);
        
        const res = await deleteInvoice(baseURL, invoiceData.id, token);
        
        if (res.status === 204 || res.status === 200) {
            toast.success("Invoice deleted successfully.");
            navigate("/dashboard");
        } else {
            toast.error("Unable to delete invoice.");
        }
    } catch (err) {
        toast.error("Failed to delete invoice.");
        console.error("Delete error:", err);
    }
};

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
    } catch (error) {
      toast.error("Failed to download PDF.");
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

  const handleSendEmail = async () => {
    if (!customerEmail) {
        return toast.error("Please enter an email address.");
    }

    if (!isValidEmail(customerEmail)) {
        return toast.error("Please enter a valid email address.");
    }

    if (!previewRef.current) {
        return toast.error("Invoice preview not found.");
    }
    try {
      setEmailing(true);

      // Generate anggg PDF blob
      const pdfBlob = await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`,
        true); 

      const formData = new FormData();
      formData.append("file", pdfBlob);
      formData.append("email", customerEmail);

      const token = await getToken();
      console.log("token:", token);
      const response = await sendInvoice(baseURL, token, formData);

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setShowModal(false);
        setCustomerEmail("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sending email.");
    } finally {
      setEmailing(false);
    }
  };

  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is missing.");
      navigate("/dashboard");
    }
  }, [invoiceData, navigate]);

    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

            {/*Action buttons*/}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">

                 {/*List of template buttons*/}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({ id, label }) => (
                        <button 
                            key={id}
                            style={{minWidth:"100px", height:"38px"}}
                            onClick={() => setSelectedTemplate(id)}
                            className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? "btn-warning" : "btn-outline-secondary"}`}>
                            {label}
                        </button>
                    ))}
                    
                </div>

                {/*List of action  buttons*/}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
                        {loading && <Loader2 className="me-2 spin-animation" size={18}/>}
                        {loading ? "Saving..." : "Save and Exit"}</button>
                    
                    {invoiceData.id && <button className="btn btn-danger d-flex align-items-center justify-content-center" onClick={handleDelete}>Delete Invoice</button>}
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

                    <button className="btn btn-info" onClick={() => setShowModal(true)}>Send Email</button>

                    <button className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={handleDownloadPdf} disabled={downloading}>
                        {downloading && <Loader2 className="me-2 spin-animation" size={18}/>}
                        {downloading ? "Downloading..." : "Download PDF"}
                    </button>
                </div>
            </div>

            {/*Invoice preview*/}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">

                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
                </div>
            </div>

            {showModal && (
            <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Send Invoice</h5>
                    <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    ></button>
                </div>
                <div className="modal-body">
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSendEmail}
                    disabled={emailing}
                    >
                    {emailing ? "Sending..." : "Send"}
                    </button>
                    <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>

    );
};

export default PreviewPage;