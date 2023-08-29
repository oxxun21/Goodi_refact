import axios from "axios";
import { BASE_URL } from "../utils";
import { imageInstance } from "./instance";

// TODO: 이미지 API 3번째걸로 통일
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

export const uploadImageChangeAPI = async (formData) => {
  try {
    const res = await imageInstance.post("/image/uploadfile", formData);
    return res;
  } catch (err) {
    return err;
  }
};

export const uploadImageAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await imageInstance.post("/image/uploadfile", formData);
    console.log(res);
    return res.data.filename;
  } catch (error) {
    throw error;
  }
};
