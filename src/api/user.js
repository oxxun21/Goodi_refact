import { unauthInstance } from "./instance";
import { authInstance } from "./instance";

export const singUpAPI = async ({ username, email, password, accountname, intro, image }) => {
  try {
    const response = await unauthInstance.post("/user", { user: { username, email, password, accountname, intro, image } });
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async ({ email, password }) => {
  try {
    const response = await unauthInstance.post("/user/login", { user: { email, password } });
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
