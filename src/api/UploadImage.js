import axios from "axios";
import { BASE_URL } from "../utils";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(BASE_URL + "image/uploadfile", formData);
    return response.data.filename;
  } catch (error) {
    throw error;
  }
};
