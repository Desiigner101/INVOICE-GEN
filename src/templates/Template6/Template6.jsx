import "./Template6.css";

const Template6 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.amount,
    0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="template6 border rounded mx-auto my-4 px-2 px-sm-4 py-3 w-800">
      {/* Header with Blue Accent */}
      <div className="header-blue p-4 mb-4 rounded">
        <div className="row align-items-center">
          <div className="col-md-6">
            {data.companyLogo && (
              <img src={data.companyLogo} alt="Logo" width={98} className="mb-2" />
            )}
            <h2 className="company-title text-white mb-1">{data.companyName}</h2>
            <p className="text-white-50 mb-0">{data.companyAddress}</p>
            <p className="text-white-50 mb-0">Phone: {data.companyPhone}</p>
          </div>
          <div className="col-md-6 text-end">
            <h1 className="invoice-title-blue text-white mb-3">INVOICE</h1>
            <div className="invoice-info-blue">
              <p className="mb-1"><strong>Invoice #:</strong> {data.invoiceNumber}</p>
              <p className="mb-1"><strong>Date:</strong> {data.invoiceDate}</p>
              <p className="mb-0"><strong>Due:</strong> {data.paymentDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="billing-card-blue p-3 rounded h-100">
            <h3 className="section-title-blue mb-2">Bill To</h3>
            <p className="mb-1"><strong>{data.billingName}</strong></p>
            <p className="mb-1">{data.billingAddress}</p>
            <p className="mb-0">Phone: {data.billingPhone}</p>
          </div>
        </div>
        {data.shippingName && (
          <div className="col-md-6">
            <div className="billing-card-blue p-3 rounded h-100">
              <h3 className="section-title-blue mb-2">Ship To</h3>
              <p className="mb-1"><strong>{data.shippingName}</strong></p>
              <p className="mb-1">{data.shippingAddress}</p>
              <p className="mb-0">Phone: {data.shippingPhone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="table-responsive mb-4">
        <table className="table table-hover">
          <thead className="table-header-blue">
            <tr>
              <th className="p-3">Description</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-end">Rate</th>
              <th className="p-3 text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="p-3">{item.name}</td>
                <td className="p-3 text-center">{item.qty}</td>
                <td className="p-3 text-end">₱{item.amount?.toFixed(2)}</td>
                <td className="p-3 text-end">₱{(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="d-flex justify-content-end mb-4">
        <div className="totals-blue p-3 rounded" style={{ minWidth: "300px" }}>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          {data.tax > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <span>Tax ({data.tax}%):</span>
              <span>₱{taxAmount.toFixed(2)}</span>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-between fw-bold total-blue">
            <span>TOTAL:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      {data.accountName && (
        <div className="bank-details-blue p-3 rounded mb-3">
          <h3 className="section-title-blue mb-2">Payment Details</h3>
          <p className="mb-1"><strong>Account:</strong> {data.accountName}</p>
          <p className="mb-1"><strong>Number:</strong> {data.accountNumber}</p>
          <p className="mb-0"><strong>Code:</strong> {data.accountIfscCode}</p>
        </div>
      )}

      {/* Notes */}
      {data.notes && (
        <div className="notes-blue p-3 rounded">
          <h3 className="section-title-blue mb-2">Notes</h3>
          <p className="mb-0">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template6;