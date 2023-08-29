import { authInstance, instance } from "./instance";

//상품 작성
export const productUploadAPI = async ({ link, itemName, price, itemImage }) => {
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
    return error.response;
  }
};

//상품 목록
export const productListAPI = async ({ accountname }) => {
  try {
    const response = await instance.get(`/product/${accountname}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//상품 수정
export const productPutAPI = async (product_id, productData) => {
  try {
    const response = await instance.put(`/product/${product_id}`, productData);
    return response;
  } catch (error) {
    throw error;
  }
};

//상품 수정시에 불러오기
export const productGetUpdateAPI = async (id) => {
  try {
    const response = await instance.get(`/product/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//상품 삭제
export const productDeleteAPI = async (product_id) => {
  try {
    const response = await instance.delete(`/product/${product_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
