import { instance } from "./instance";

interface profile_I {
  username: string;
  accountname: string;
  intro: string;
  image: string;
}

//프로필 정보
export const accountProfileAPI = async ({ accountname }: Pick<profile_I, "accountname">) => {
  try {
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
