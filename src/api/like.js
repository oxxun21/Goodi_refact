import { instance } from "./instance";

export const likeAPI = async (id) => {
  try {
    const response = await instance.post(`/post/${id}/heart`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const cancelLikeAPI = async (id) => {
  try {
    const response = await instance.delete(`/post/${id}/unheart`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
