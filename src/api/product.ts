import axios from "axios";
import { instance } from "./instance";
import { productWriting_I } from "../interface/product_I";
import { accountname_I } from "../interface/user_I";

//상품 작성
export const productUploadAPI = async ({ link, itemName, price, itemImage }: productWriting_I) => {
  try {
    const response = await instance.post("/product", {
      product: {
        itemName,
        price,
        link,
        itemImage,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

//상품 목록
export const productListAPI = async (accountname: string) => {
  try {
    const response = await instance.get(`/product/${accountname}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//상품 수정
export const productPutAPI = async (product_id: string | undefined, productData: productWriting_I) => {
  try {
    const response = await instance.put(`/product/${product_id}`, { product: productData });
    return response;
  } catch (error) {
    throw error;
  }
};

//상품 수정시에 불러오기
export const productGetUpdateAPI = async (id: string | undefined) => {
  try {
    const response = await instance.get(`/product/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//상품 삭제
export const productDeleteAPI = async (product_id: string | undefined) => {
  try {
    const response = await instance.delete(`/product/${product_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
