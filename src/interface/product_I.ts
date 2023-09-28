export interface product_I {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
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

export interface productWriting_I {
  id?: string;
  link: string;
  itemName: string;
  price: number;
  itemImage: string;
  accountname?: string;
}
