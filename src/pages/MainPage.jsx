import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx"; // lucide icon

function MainPage() {
  const navigate = useNavigate();

  const {
    invoiceData,
    setInvoiceData,
    invoiceTitle,
    setInvoiceTitle,
    setSelectedTemplate,
  } = useContext(AppContext);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTemplateClick = (templateId) => {
    const hasInvalidItem = invoiceData.items.some(
      (item) => !item.qty || !item.amount
    );

    if (hasInvalidItem) {
      toast.error("Please enter quantity and amount for all items.");
      return;
    }
    setSelectedTemplate(templateId);
    navigate("/preview");
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
    setInvoiceData((prev) => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Title Bar */}
        <div className="bg-white border rounded shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center">
            {isEditingTitle ? (
              <input
                type="text"
                className="form-control me-2"
                value={invoiceTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                autoFocus
              />
            ) : (
              <>
                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                <button
                  onClick={handleTitleEdit}
                  className="btn btn-sm p-0 border-0 bg-transparent"
                  title="Edit Title"
                >
                  <Pencil size={20} className="text-primary" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Invoice Form and Template Grid */}
        <div className="row g-4 align-items-stretch">
          {/* Invoice Form */}
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <InvoiceForm />
            </div>
          </div>

          {/* Template Grid */}
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-4 w-100">
              <TemplateGrid onTemplateClick={handleTemplateClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
