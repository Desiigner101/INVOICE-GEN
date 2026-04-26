import "./Template10.css";

const Template10 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.amount || 0),
    0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="template10 mx-auto my-4 w-800">
      <div className="invoice-card-modern px-3 px-sm-4 py-3">

        {/* Header */}
        <div className="header-modern mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              {data.companyLogo && (
                <img src={data.companyLogo} width={90} className="mb-2" />
              )}
              <h2 className="mb-1">{data.companyName}</h2>
              <p className="text-muted mb-0">{data.companyAddress}</p>
              <p className="text-muted mb-0">Phone: {data.companyPhone}</p>
            </div>

            <div className="col-md-6 text-end">
              <h1 className="invoice-title-modern mb-3">INVOICE</h1>
              <div>
                <p className="mb-1"><strong>#</strong> {data.invoiceNumber}</p>
                <p className="mb-1"><strong>Date:</strong> {data.invoiceDate}</p>
                <p className="mb-0"><strong>Due:</strong> {data.paymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="billing-card-modern p-3 h-100">
              <h3 className="section-title-modern mb-2">Bill To</h3>
              <p className="mb-1"><strong>{data.billingName}</strong></p>
              <p className="mb-1">{data.billingAddress}</p>
              <p className="mb-0">Phone: {data.billingPhone}</p>
            </div>
          </div>

          {data.shippingName && (
            <div className="col-md-6">
              <div className="billing-card-modern p-3 h-100">
                <h3 className="section-title-modern mb-2">Ship To</h3>
                <p className="mb-1"><strong>{data.shippingName}</strong></p>
                <p className="mb-1">{data.shippingAddress}</p>
                <p className="mb-0">Phone: {data.shippingPhone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="table-responsive mb-4">
          <table className="table table-modern">
            <thead className="table-header-modern">
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
                  <td className="p-3 text-end">
                    ₱{parseFloat(item.amount || 0).toFixed(2)}
                  </td>
                  <td className="p-3 text-end">
                    ₱{(item.qty * parseFloat(item.amount || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="d-flex justify-content-end mb-4">
          <div className="totals-modern p-3" style={{ minWidth: "300px" }}>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>

            {data.tax > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span>Tax ({data.tax}%)</span>
                <span>₱{taxAmount.toFixed(2)}</span>
              </div>
            )}

            <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

            <div className="d-flex justify-content-between total-modern">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bank */}
        {data.accountName && (
          <div className="bank-modern p-3 mb-3">
            <h3 className="section-title-modern mb-2">Payment Details</h3>
            <p><strong>{data.accountName}</strong></p>
            <p>{data.accountNumber}</p>
            <p>{data.accountIfscCode}</p>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div className="notes-modern p-3">
            <h3 className="section-title-modern mb-2">Notes</h3>
            <p>{data.notes}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Template10;