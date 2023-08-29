import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import UploadTotalUI from "../components/PostProductWriting/UploadTotalUI";

//이미지
import productUpload from "../assets/Prodcut_upload.svg";

//API
import { productUploadAPI } from "../api";

export default function ProductUpload() {
  const navigate = useNavigate();

  const [imageWrap, setImageWrap] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");
  const [data, setData] = useState({
    product: {
      itemName: "",
      price: "",
      link: "",
      itemImage: "",
    },
  });

  const productSend = async (e) => {
    e.preventDefault();
    const response = await productUploadAPI({
      link: data.product.link,
      itemName: data.product.itemName,
      price: parseInt(data.product.price),
      itemImage: imageWrap.join(","),
    });

    console.log(response);
    if (response.status === 200) {
      navigate(`/productDetail/${response.data.product.id}`);
    }
    if (response.status === 422) {
      setErrorMSG(response.data.message);
    }
  };

  return (
    <Layout reduceTop="true">
      <UploadTotalUI
        src={productUpload}
        subtext="당신의 상품을 업로드 해보세요!"
        send={productSend}
        data={data}
        setData={setData}
        errorMSG={errorMSG}
        imageWrap={imageWrap}
        setImageWrap={setImageWrap}
      />
    </Layout>
  );
}
