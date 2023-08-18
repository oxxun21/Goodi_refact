import { authInstance } from "./instance";

export const likeAPI = async (id) => {
  try {
    const response = await authInstance.post(`/post/${id}/heart`);
    return response.data.post.heartCount;
  } catch (error) {
    throw error;
  }
};

export const cancelLikeAPI = async (id) => {
  try {
    const response = await authInstance.delete(`/post/${id}/unheart`);
    return response.data.post.heartCount;
  } catch (error) {
    throw error;
  }
};
