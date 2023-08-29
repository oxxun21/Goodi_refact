import { authInstance, instance, unauthInstance } from "./instance";

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
    const response = await instance.post("/user/login", { user: { email, password } });
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
