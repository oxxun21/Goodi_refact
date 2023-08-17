import { authInstance } from "./instance";

export const followAPI = async (accountname) => {
  try {
    const response = await authInstance.post(`/profile/${accountname}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const unfollowAPI = async (accountname) => {
  try {
    const response = await authInstance.delete(`/profile/${accountname}/unfollow`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const followerAPI = async (accountname) => {
  try {
    const response = await authInstance.get(`/profile/${accountname}/follower`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const followingAPI = async (accountname) => {
  try {
    const response = await authInstance.get(`/profile/${accountname}/following`);
    return response;
  } catch (error) {
    throw error;
  }
};
