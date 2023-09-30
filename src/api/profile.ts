import { Profile_I, Accountname_I } from "../interface";
import { instance } from "./instance";

//프로필 정보
export const accountProfileAPI = async ({ accountname }: Accountname_I) => {
  try {
    const response = await instance.get(`/profile/${accountname}`);
    return response.data.profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//프로필 수정
export const updateProfile = async ({ username, accountname, intro, image }: Profile_I) => {
  try {
    const response = await instance.put(`/user`, { user: { username, accountname, intro, image } });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
