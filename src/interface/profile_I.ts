export interface ProfileInfo_I {
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

export interface Profile_I {
  username: string;
  accountname?: string;
  intro: string;
  image: string;
}
