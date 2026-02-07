import { useContext, useRef, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { saveInvoice } from "../service/InvoiceService";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import {Loader2} from "lucide-react"

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveAndExit = async() => {
        try{
            setLoading(true);
            //TODO: create a thumbnail url
            const payload = {
                ...invoiceData,
                template: selectedTemplate,
            };
            const response  = await saveInvoice(baseURL, payload);
            if(response.status === 200){
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
                    <button className="btn btn-danger">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send Email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
                </div>
            </div>

            {/*Invoice preview*/}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">

                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
                </div>
            </div>
        </div>

    );
};

export default PreviewPage;