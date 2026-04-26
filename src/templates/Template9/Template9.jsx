import "./Template9.css";

const Template9 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.amount || 0),
    0
  );

  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="template9 mx-auto my-4 w-800">
      <div className="invoice-card-gray px-3 px-sm-4 py-3">

        {/* Header */}
        <div className="header-gray pb-3 mb-4">
          <div className="row align-items-center">
            
            {/* Company Info */}
            <div className="col-md-6">
              {data.companyLogo && (
                <img src={data.companyLogo} width={80} className="mb-2" />
              )}
              <div className="company-name-gray">{data.companyName}</div>
              <div className="company-details-gray">
                {data.companyAddress}
              </div>
              <div className="company-details-gray">
                Phone: {data.companyPhone}
              </div>
            </div>

            {/* Invoice Info */}
            <div className="col-md-6 invoice-meta-gray">
              <div className="invoice-title-gray mb-2">INVOICE</div>
              <div className="meta-text-gray">
                <strong>#</strong> {data.invoiceNumber}
              </div>
              <div className="meta-text-gray">
                <strong>Date:</strong> {data.invoiceDate}
              </div>
              <div className="meta-text-gray">
                <strong>Due:</strong> {data.paymentDate}
              </div>
            </div>

          </div>
        </div>

        {/* Billing */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="billing-card-gray p-3 h-100">
              <div className="section-title-gray">Bill To</div>
              <p className="mb-1"><strong>{data.billingName}</strong></p>
              <p className="mb-1">{data.billingAddress}</p>
              <p className="mb-0">Phone: {data.billingPhone}</p>
            </div>
          </div>

          {data.shippingName && (
            <div className="col-md-6">
              <div className="billing-card-gray p-3 h-100">
                <div className="section-title-gray">Ship To</div>
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
            <thead className="table-header-gray">
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
          <div className="totals-gray p-3">

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

            <div className="d-flex justify-content-between total-highlight-gray">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>

          </div>
        </div>

        {/* Payment Details */}
        {data.accountName && (
          <div className="footer-box-gray p-3 mb-3">
            <div className="section-title-gray">Payment Details</div>
            <p className="mb-1"><strong>{data.accountName}</strong></p>
            <p className="mb-1">{data.accountNumber}</p>
            <p className="mb-0">{data.accountIfscCode}</p>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div className="footer-box-gray p-3">
            <div className="section-title-gray">Notes</div>
            <p className="mb-0">{data.notes}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Template9;