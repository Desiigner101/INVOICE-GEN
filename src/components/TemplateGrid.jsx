import { templates } from "../assets/assets.js";

const TemplateGrid = ({ onTemplateClick }) => {
  return (
    <div className="row g-3">
      {templates.map(({ id, label, image }) => (
        <div key={id} className="col-12 col-sm-6 col-lg-4">
          <div
            onClick={() => onTemplateClick(id)}
            className="border rounded shadow-sm overflow-hidden template-hover cursor-pointer"
            title={label}
          >
            <img src={image} alt={label} className="w-100" loading="lazy" />
            <div className="p-2 text-center fw-medium">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
