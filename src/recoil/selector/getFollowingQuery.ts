import { selector } from "recoil";
import { followingAPI } from "../../api";
import accountname from "../accountname";

export const getFollowingQuery = selector({
  key: "getFollowing",
  get: async ({ get }) => {
    try {
      const response = await followingAPI(get(accountname));
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      console.error("getFollowingQuery 에러:", error);
      throw error;
    }
  },
});
