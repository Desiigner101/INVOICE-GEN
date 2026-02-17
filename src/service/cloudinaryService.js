import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", "invoices-thumbnail"); 
    formData.append("cloud_name", "dgpuex4bh");

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dgpuex4bh/image/upload`,
        formData
    );

    return res.data.secure_url;
};