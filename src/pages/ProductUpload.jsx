import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import UploadTotalUI from "../components/PostProductWriting/UploadTotalUI";

//이미지
import productUpload from "../assets/Prodcut_upload.svg";

//API
import { productUploadAPI } from "../api";

//recoil
import { loginToken } from "../recoil";

export default function ProductUpload() {
  const navigate = useNavigate();

  const token = useRecoilValue(loginToken);

  const [imageWrap, setImageWrap] = useState([]);
  const [userErrorMessage, setUserErrorMessage] = useState([]);

  // 상품 입력 데이터
  const [productData, setProductData] = useState();

  const [data, setData] = useState({
    product: {
      itemName: "",
      price: "", //1원 이상
      link: "",
      itemImage: "",
    },
  });

  const getProductData = (data) => {
    setProductData(data);
  };

  useEffect(() => {
    if (productData) {
      handlePost(productData, token);
    }
  }, [productData]);

  const handlePost = async (ProductData, token) => {
    const response = await productUploadAPI(ProductData, token);

    if (response.hasOwnProperty("product")) navigate(`/productDetail/${response.product.id}`);
  };

  const handleError = () => {
    setData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        itemImage: imageWrap.join(),
      },
    }));

    const errors = [];
    if (data.product.itemImage === "" && imageWrap.length === 0) {
      errors.push("이미지를 한개 이상 업로드 해주세요");
    }

    if (data.product.itemName === "" || !data.product.itemName) {
      errors.push("상품명을 입력해주세요");
    } else if (data.product.price === "" || !data.product.price) {
      errors.push("상품가격을 입력해주세요");
    } else if (data.product.link === "" || !data.product.link) {
      errors.push("상품소개글을 입력해주세요");
    }
    setUserErrorMessage(errors);
  };

  return (
    <Layout reduceTop="true">
      <UploadTotalUI
        src={productUpload}
        subtext="당신의 상품을 업로드 해보세요!"
        getData={getProductData}
        data={data}
        setData={setData}
        handleError={handleError}
        setImageWrap={setImageWrap}
        imageWrap={imageWrap}
        userErrorMessage={userErrorMessage}
      />
    </Layout>
  );
}
