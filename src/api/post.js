import { instance } from "./instance";

//게시글 작성
export const postUploadAPI = async ({ content, image }) => {
  try {
    const response = await instance.post(`/post`, {
      post: {
        content,
        image,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

//게시글 목록
export const postListAPI = async ({ accountname }) => {
  try {
    const response = await instance.get(`/post/${accountname}/userpost`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정
export const postPutAPI = async (id, putData) => {
  try {
    const response = await instance.put(`/post/${id}`, putData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정 시에 불러오기
export const postGetUpdateAPI = async (id) => {
  try {
    const reponse = await instance.get(`/post/${id}`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

//게시글 삭제
export const postDeleteAPI = async (id) => {
  try {
    const response = await instance.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
