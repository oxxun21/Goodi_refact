import { instance } from "./instance";

export const likeAPI = async (id: string) => {
  try {
    const response = await instance.post(`/post/${id}/heart`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const cancelLikeAPI = async (id: string) => {
  try {
    const response = await instance.delete(`/post/${id}/unheart`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
