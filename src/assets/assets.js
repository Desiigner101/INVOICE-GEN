import template1 from './template1.png';
import template2 from './template2.png';
import template3 from './template3.png';
import template4 from './template4.png';
import template5 from './template5.png';
import template6 from './template6.png';
import template7 from './template7.png';
import template8 from './template8.png';
import template9 from './template9.png';
import template10 from './template10.png';
import upload_area from './upload_area.png';
import logo from './logo_invoice.png';
import landing1 from './Landing1.png';
import landing2 from './Landing2.png';
import landing3 from './Landing3.png';
import landing4 from './Landing4.png';


//download images from assets folder!

export const assets = {
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
  template9,
  template10,
  upload_area,
  logo,
  landing1,
  landing2,
  landing3,
  landing4
} // no usages

export const templates = [
    { id: "template1", label: "Template 1", image: assets.template1, tier: "FREE" }, // ✅ ADD tier
    { id: "template2", label: "Template 2", image: assets.template2, tier: "FREE" },
    { id: "template3", label: "Template 3", image: assets.template3, tier: "FREE" },
    { id: "template4", label: "Template 4", image: assets.template4, tier: "FREE" },
    { id: "template5", label: "Template 5", image: assets.template5, tier: "FREE" },
    { id: "template6", label: "Template 6 - Premium ", image: assets.template6, tier: "PREMIUM" }, // ✅ NEW
    { id: "template7", label: "Template 7 - Premium ", image: assets.template7, tier: "PREMIUM" }, // ✅ NEW
    { id: "template8", label: "Template 8 - Premium ", image: assets.template8, tier: "PREMIUM" }, // ✅ NEW
    { id: "template9", label: "Template 9 - Premium ", image: assets.template9, tier: "PREMIUM" }, // ✅ NEW
    { id: "template10", label: "Template 10 - Premium ", image: assets.template10, tier: "PREMIUM" }, // ✅ NEW
];