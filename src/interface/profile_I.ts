export interface profileInfo_I {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  following: [];
  follower: [];
  followerCount: number;
  followingCount: number;
}

export interface profile_I {
  username: string;
  accountname?: string;
  intro: string;
  image: string;
}
