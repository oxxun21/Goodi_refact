import React, { useState, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);

  const [imageWrap, setImageWrap] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");

  const handleProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current instanceof HTMLFormElement) {
      const itemName = formElements.elements.namedItem("itemName") as HTMLInputElement;
      const price = formElements.elements.namedItem("price") as HTMLInputElement;
      const link = formElements.elements.namedItem("link") as HTMLInputElement;

      const response = await productUploadAPI({
        link: link.value,
        itemName: itemName.value,
        price: parseInt(price.value),
        itemImage: imageWrap.join(","),
      });

      if (response?.status === 200) {
        navigate(`/productDetail/${response.data.product.id}`);
      }
      if (response?.status === 422) {
        setErrorMSG(response.data.message);
      }
    }
  };

  return (
    <Layout reduceTop={true}>
      <UploadTotalUI src={productUpload} subtext="당신의 상품을 업로드 해보세요!" send={handleProduct} errorMSG={errorMSG} imageWrap={imageWrap} setImageWrap={setImageWrap} formRef={formRef} />
    </Layout>
  );
}
