import { useContext, useEffect, useRef, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { saveInvoice, sendInvoice } from "../service/InvoiceService.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import html2canvas from "html2canvas";
import { deleteInvoice } from "../service/InvoiceService.js";
import { generatePdfFromElement } from "../utils/pdfUtils";
import { useAuth, useUser } from "@clerk/clerk-react";

const PREMIUM_TEMPLATE_IDS = new Set(
    templates.filter((t) => t.tier === "PREMIUM").map((t) => t.id)
);
const FREE_FALLBACK_TEMPLATE = templates.find((t) => t.tier === "FREE")?.id ?? templates[0].id;

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL, setInvoiceData, isPremium, isUserLoaded } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    console.log("isUserLoaded:", isUserLoaded, "| isPremium:", isPremium); // ← add this

    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        if (!isUserLoaded) return;
        if (selectedTemplate && PREMIUM_TEMPLATE_IDS.has(selectedTemplate) && !isPremium) {
            setSelectedTemplate(FREE_FALLBACK_TEMPLATE);
            toast.error("That template requires a premium plan.");
        }
    }, [isUserLoaded, isPremium]);

    useEffect(() => {
        if (!invoiceData || !invoiceData.items?.length) {
            toast.error("Invoice data is missing.");
            navigate("/dashboard");
        }
    }, [invoiceData, navigate]);

    const handleSelectTemplate = (templateId, isTemplatePremium) => {
        if (isTemplatePremium && (!isUserLoaded || !isPremium)) {
            setShowUpgradeModal(true);
            return;
        }
        setSelectedTemplate(templateId);
    };

    const handleSaveAndExit = async () => {
        try {
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
            const response = await saveInvoice(baseURL, payload, token);
            if (response.status === 200) {
                setInvoiceData(response.data);
                toast.success("Invoice saved successfully.");
                navigate("/dashboard");
            } else {
                toast.error("Something went wrong while saving the invoice.");
            }
        } catch (error) {
            toast.error("Failed to save invoice.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!invoiceData.id) {
            toast.error("Cannot delete unsaved invoice. Please save first.");
            return;
        }
        try {
            const token = await getToken();
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
            await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
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
        if (!customerEmail) return toast.error("Please enter an email address.");
        if (!isValidEmail(customerEmail)) return toast.error("Please enter a valid email address.");
        if (!previewRef.current) return toast.error("Invoice preview not found.");
        try {
            setEmailing(true);
            const pdfBlob = await generatePdfFromElement(
                previewRef.current,
                `invoice_${Date.now()}.pdf`,
                true
            );
            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("email", customerEmail);
            const token = await getToken();
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

    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

            <div className="d-flex flex-column align-items-center mb-4 gap-3">

                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({ id, label, tier }) => {
                        const isTemplatePremium = tier === "PREMIUM";
                        const locked = isTemplatePremium && !isPremium;
                        return (
                            <button
                                key={id}
                                style={{ minWidth: "100px", height: "38px" }}
                                onClick={() => handleSelectTemplate(id, isTemplatePremium)}
                                className={`btn btn-sm rounded-pill p-2 d-flex align-items-center justify-content-center gap-1 ${selectedTemplate === id ? "btn-warning" : "btn-outline-secondary"}`}>
                                {locked && <Lock size={13} />}
                                {label}
                                {isTemplatePremium && (
                                    <span className="badge ms-1" style={{ fontSize: "9px", backgroundColor: "#f59e0b", color: "#000" }}>
                                        PRO
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
                        {loading && <Loader2 className="me-2 spin-animation" size={18} />}
                        {loading ? "Saving..." : "Save and Exit"}
                    </button>
                    {invoiceData.id && (
                        <button className="btn btn-danger d-flex align-items-center justify-content-center" onClick={handleDelete}>
                            Delete Invoice
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                    <button className="btn btn-info" onClick={() => setShowModal(true)}>Send Email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center" onClick={handleDownloadPdf} disabled={downloading}>
                        {downloading && <Loader2 className="me-2 spin-animation" size={18} />}
                        {downloading ? "Downloading..." : "Download PDF"}
                    </button>
                </div>
            </div>

            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Send Invoice</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
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
                                <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                                    {emailing ? "Sending..." : "Send"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUpgradeModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center p-3">
                            <div className="modal-body">
                                <Lock size={40} className="mb-3 text-warning" />
                                <h5 className="fw-bold">Premium Template</h5>
                                <p className="text-muted">
                                    This template is only available on the <strong>Premium plan</strong>.
                                </p>
                            </div>
                            <div className="modal-footer justify-content-center border-0">
                                <button className="btn btn-warning fw-semibold px-4" onClick={() => { setShowUpgradeModal(false); navigate("/subscription"); }}>
                                    Upgrade to Premium
                                </button>
                                <button className="btn btn-outline-secondary" onClick={() => setShowUpgradeModal(false)}>
                                    Maybe Later
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