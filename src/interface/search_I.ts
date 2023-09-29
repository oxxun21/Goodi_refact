export interface Search_I {
  _id: string;
  username: string;
  accountname: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
  image: string;
  isfollow: boolean;
}
