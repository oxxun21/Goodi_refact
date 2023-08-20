import { unauthInstance, authInstance } from "./instance";
import { followAPI, unfollowAPI, followerAPI, followingAPI } from "./follow";
import { likeAPI, cancelLikeAPI } from "./like";
import { postUploadAPI, postListAPI, postPutAPI, postGetUpdateAPI, postDeleteAPI } from "./post";
import { productUploadAPI, productListAPI, productPutAPI, productDeleteAPI, productGetUpdateAPI } from "./product";
import { profileAPI, accountProfileAPI, updateProfile } from "./profile";
import { uploadImage } from "./UploadImage";
import { singUpAPI, loginAPI, searchAPI } from "./user";

export {
  unauthInstance,
  authInstance,
  followAPI,
  unfollowAPI,
  followerAPI,
  followingAPI,
  likeAPI,
  cancelLikeAPI,
  postUploadAPI,
  postListAPI,
  postPutAPI,
  postGetUpdateAPI,
  postDeleteAPI,
  productUploadAPI,
  productListAPI,
  productPutAPI,
  productDeleteAPI,
  productGetUpdateAPI,
  profileAPI,
  accountProfileAPI,
  updateProfile,
  uploadImage,
  singUpAPI,
  loginAPI,
  searchAPI,
};
