export interface following_I {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  following: string[];
  follower: string[];
  followerCount: 1;
  followingCount: 0;
}

export interface follower_I {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  following: string[];
  follower: string[];
  followerCount: 1;
  followingCount: 0;
}

export interface followingSelector_I {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
}
