import { authInstance } from "./instance";

//내 프로필 정보
export const profileAPI = async () => {
  try {
    const response = await authInstance.get(`/user/myinfo`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//프로필 정보
export const accountProfileAPI = async (accountname) => {
  try {
    const response = await authInstance.get(`/profile/${accountname}`);
    return response.data.profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//프로필 수정
export const updateProfile = async ({ username, accountname, intro, image }) => {
  try {
    const response = await authInstance.put(`/user`, { user: { username, accountname, intro, image } });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
