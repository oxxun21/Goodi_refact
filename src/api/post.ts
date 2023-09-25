import axios from "axios";
import { instance } from "./instance";
import { postWriting_I } from "../interface/post_I";

//게시글 작성
export const postUploadAPI = async ({ content, image }: postWriting_I) => {
  try {
    const response = await instance.post(`/post`, {
      post: {
        content,
        image,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

//게시글 목록
export const postListAPI = async ({ accountname }: Pick<postWriting_I, "accountname">) => {
  try {
    const response = await instance.get(`/post/${accountname}/userpost`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정
export const postPutAPI = async (id: string, putData: postWriting_I) => {
  try {
    const response = await instance.put(`/post/${id}`, putData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정 시에 불러오기
export const postGetUpdateAPI = async (id: string) => {
  try {
    const reponse = await instance.get(`/post/${id}`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

//게시글 삭제
export const postDeleteAPI = async (id: string) => {
  try {
    const response = await instance.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
