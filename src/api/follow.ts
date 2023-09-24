import { instance } from "./instance";

export const followAPI = async (accountname: string) => {
  try {
    const response = await instance.post(`/profile/${accountname}/follow`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const unfollowAPI = async (accountname: string) => {
  try {
    const response = await instance.delete(`/profile/${accountname}/unfollow`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const followerAPI = async (accountname: string) => {
  try {
    const response = await instance.get(`/profile/${accountname}/follower/?limit=100`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followingAPI = async (accountname: string) => {
  try {
    const response = await instance.get(`/profile/${accountname}/following/?limit=100`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
