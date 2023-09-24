export interface profile_I {
  _id: string;
  username: string;
  accountname: string;
  image: string;
  isfollow: boolean;
  following: [];
  follower: [];
  followerCount: number;
  followingCount: number;
}
