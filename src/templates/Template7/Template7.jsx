import "./Template7.css";

const Template7 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.amount || 0), 0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="template7 mx-auto my-4 w-800">
      <div className="invoice-card-indigo px-3 px-sm-4 py-3">

        <div className="header-indigo mb-4 rounded">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>{data.companyName}</h2>
              <p className="mb-0">{data.companyAddress}</p>
            </div>
            <div className="col-md-6 text-end">
              <h1 className="invoice-title-indigo">INVOICE</h1>
              <p>#{data.invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="billing-card-indigo p-3">
              <h3 className="section-title-indigo">Bill To</h3>
              <p><strong>{data.billingName}</strong></p>
              <p>{data.billingAddress}</p>
            </div>
          </div>
        </div>

        <table className="table mb-4">
          <thead className="table-header-indigo">
            <tr>
              <th>Description</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-end">₱{parseFloat(item.amount).toFixed(2)}</td>
                <td className="text-end">₱{(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <div className="totals-indigo p-3" style={{ minWidth: "300px" }}>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between total-indigo">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Template7;