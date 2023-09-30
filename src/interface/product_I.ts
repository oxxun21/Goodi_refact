export interface ProductList_I {
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
    followerCount?: number;
    followingCount?: number;
  };
}

export interface ProductWriting_I {
  id?: string;
  link: string;
  itemName: string;
  price: number;
  itemImage: string;
  accountname?: string;
}

export interface ProduceCard_I {
  profile: string | undefined;
  name: string;
  email: string;
  img: string | undefined;
  title: string;
  description: string;
  price: number;
  id: string;
}
