import axios from "axios";
import { BASE_URL, getLoginCookie } from "../utils";

export const imageInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    "Content-Type": "multipart/form-data",
  },
});

export const uploadImageTest = async (formData) => {
  try {
    const res = await imageInstance.post("/image/uploadfile", formData);
    return res;
  } catch (err) {
    return err;
  }
};
