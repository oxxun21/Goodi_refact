import axios from "axios";
import { authInstance, unauthInstance } from "./instance";
import { BASE_URL, getLoginCookie } from "../utils";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    "Content-Type": "application/json",
  },
});

export const singUpAPI = async ({ username, email, password, accountname, intro, image }) => {
  try {
    const response = await instance.post("/user", { user: { username, email, password, accountname, intro, image } });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginAPI = async ({ email, password }) => {
  try {
    const response = await unauthInstance.post("/user/login", { user: { email, password } });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchAPI = async (keyword) => {
  try {
    const response = await authInstance.get(`/user/searchuser/?keyword=${keyword}`);
    return response;
  } catch (error) {
    throw error;
  }
};
