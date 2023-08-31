import { instance } from "./instance";

export const likeAPI = async (id) => {
  try {
    const response = await instance.post(`/post/${id}/heart`);
    return response.data.post.heartCount;
  } catch (error) {
    throw error;
  }
};

export const cancelLikeAPI = async (id) => {
  try {
    const response = await instance.delete(`/post/${id}/unheart`);
    return response.data.post.heartCount;
  } catch (error) {
    throw error;
  }
};
