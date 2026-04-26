import "./Template8.css";

const Template8 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.amount || 0),
    0
  );
  const total = subtotal;

  return (
    <div className="template8 mx-auto my-4 w-800">
      <div className="invoice-card-gradient">

        <div className="header-gradient p-4">
          <h2>{data.companyName}</h2>
          <h1>INVOICE</h1>
        </div>

        <div className="p-4">
          <div className="billing-card-gradient p-3 mb-4">
            <h3 className="section-title-gradient">Bill To</h3>
            <p>{data.billingName}</p>
          </div>

          <table className="table">
            <thead className="table-header-gradient">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₱{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="totals-gradient p-3 mt-4 text-end">
            TOTAL: ₱{total.toFixed(2)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Template8;