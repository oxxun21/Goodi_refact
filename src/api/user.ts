import axios from "axios";
import { instance } from "./instance";

interface signUp_I {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro: string;
  image: string;
}

interface login_I {
  email: string;
  password: string;
}

export const singUpAPI = async ({ username, email, password, accountname, intro, image }: signUp_I) => {
  try {
    const response = await instance.post("/user", { user: { username, email, password, accountname, intro, image } });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const loginAPI = async ({ email, password }: login_I) => {
  try {
    const response = await instance.post("/user/login", { user: { email, password } });
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchAPI = async (keyword: string) => {
  try {
    const response = await instance.get(`/user/searchuser/?keyword=${keyword}`);
    return response;
  } catch (error) {
    throw error;
  }
};
