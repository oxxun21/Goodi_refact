import { profile_I } from "../interface/profile_I";
import { accountname_I } from "../interface/user_I";
import { instance } from "./instance";

//프로필 정보
export const accountProfileAPI = async ({ accountname }: accountname_I) => {
  try {
    console.log(accountname);

    const response = await instance.get(`/profile/${accountname}`);
    return response.data.profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//프로필 수정
export const updateProfile = async ({ username, accountname, intro, image }: profile_I) => {
  try {
    const response = await instance.put(`/user`, { user: { username, accountname, intro, image } });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
