export interface Following_I {
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

export interface Follower_I {
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

export interface FollowingSelector_I {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
}
