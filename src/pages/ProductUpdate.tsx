import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import UpdateTotalUI from "../components/PostProductWriting/UpdateTotalUI";

// 이미지
import ProductUpload from "../assets/Prodcut_upload.svg";

// API
import { productGetUpdateAPI, productPutAPI } from "../api";

import { ProductWriting_I } from "../interface";

export default function ProductUpdate() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [imageWrap, setImageWrap] = useState<string[]>([]);
  const [data, setData] = useState<ProductWriting_I | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productGetUpdateAPI(product_id);
      setData({
        id: response.product.id,
        itemName: response.product.itemName,
        price: response.product.price,
        link: response.product.link,
        itemImage: response.product.itemImage,
      });
      setImageWrap(response.product.itemImage.split(","));
    };
    fetchProduct();
  }, []);

  const handleProductUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data) {
      const updatedProductData: ProductWriting_I = {
        id: data.id,
        itemName: data.itemName,
        price: data.price,
        link: data.link,
        itemImage: imageWrap.join(","),
      };
      await productPutAPI(product_id, updatedProductData);

      navigate(`/productDetail/${product_id}`);
    }
  };

  return (
    <Layout reduceTop={true}>
      {data && (
        <UpdateTotalUI
          src={ProductUpload}
          subtext="상품을 수정해주세요"
          data={data}
          send={handleProductUpdate}
          setData={setData}
          setImageWrap={setImageWrap}
          imageWrap={imageWrap}
        />
      )}
    </Layout>
  );
}
