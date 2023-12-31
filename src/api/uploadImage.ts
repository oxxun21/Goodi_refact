import { imageInstance } from "./instance";

export const uploadImageAPI = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await imageInstance.post("/image/uploadfile", formData);
    return res.data.filename;
  } catch (error) {
    throw error;
  }
};
