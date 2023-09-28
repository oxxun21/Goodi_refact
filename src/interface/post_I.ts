export interface postWriting_I {
  id?: string;
  content: string;
  image: string;
  accountname?: string;
}

export interface postList_I {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  author: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  };
}

export interface postCard_I {
  username: string;
  profileImage: string;
  email: string;
  content: string;
  image: string | undefined;
  createdAt: string;
  postId: string;
  hearted: boolean;
  heartCount: number;
}
