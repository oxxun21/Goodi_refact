import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import DetailImage from "../components/Detail/DetailImage";
import ProfileUI from "../components/ProfileUI";
import DetailSkeleton from "../style/skeletonUI/skeletonPage/DetailSkeleton";

//image
import MoneyIcon from "../assets/icon_money_black.svg";
import DeliveryIcon from "../assets/icon_delivery_dark.svg";

//API
import { productGetUpdateAPI } from "../api";

import { checkImageUrl } from "../utils";
import TotalCountPrice from "../components/Detail/TotalCountPrice";
import { product_I } from "../interface/product_I";

export default function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<product_I | null>(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await productGetUpdateAPI(id);
        setProductData(response.product);
        setPrice(response.product.price);
        setLoading(false);
      } catch (error) {
        console.error("Account API 에러가 발생했습니다", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <DetailSkeleton />
      ) : (
        <>
          {productData && (
            <DetailWrap>
              <DetailImage img={productData.itemImage.split(",")} />

              <ProductDetail>
                <div className="product_detail_top">
                  <ProfileUI
                    key={productData.author._id}
                    user_profile={checkImageUrl(productData.author.image, "profile")}
                    user_name={productData.author.username}
                    account_name={productData.author.accountname}
                  />
                </div>

                <h2 className="product_title">{productData.itemName}</h2>
                <p className="product_description">{productData.link}</p>
                <DeliveryDescription>
                  <div className="delivery_date">
                    <img src={DeliveryIcon} alt="박스 아이콘" />
                    <h3 className="delivery_price_subtitle">배송 기간</h3>
                    <p className="delivery_price_text">
                      지금 주문하면 <strong>3일 이내</strong> 출고 예정 (주말, 공휴일 제외)
                    </p>
                  </div>
                  <div className="delivery_price">
                    <img src={MoneyIcon} alt="동전 아이콘" />
                    <h3 className="delivery_price_subtitle">배송비</h3>
                    <p className="delivery_price_text">
                      구디 제품 80,000원 이상 구매시 무료배송
                      <br />
                      제주도를 포함한 도서/산간지역은 추가 배송비 3,000원
                    </p>
                  </div>
                </DeliveryDescription>
                <TotalCountPrice productData={productData} />
              </ProductDetail>
            </DetailWrap>
          )}
        </>
      )}
    </Layout>
  );
}

const DetailWrap = styled.section`
  margin: 0 60px 120px 80px;
  display: flex;
  gap: 5%;
`;

const ProductDetail = styled.div`
  width: 55%;

  .product_detail_top {
    display: flex;
    gap: 16px;
  }

  .product_title {
    font-family: var(--font--Bold);
    font-size: 34px;
  }

  .product_description {
    color: var(--gray500-color);
    line-height: 1.6;
    margin-top: 16px;
  }

  .product_count_subtitle {
    font-family: var(--font--Bold);
    margin: 60px 0 24px 0;
  }

  hr {
    margin: 24px 0 32px 0;
    border: solid 1px var(--gray100-color);
  }
`;

const DeliveryDescription = styled.section`
  padding: 31px 24px 24px 24px;
  box-sizing: border-box;
  background-color: var(--gray50-color);
  border-radius: 4px;
  margin-top: 24px;

  & div {
    display: flex;
  }

  & div img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
    margin-top: -7px;
  }

  & div h3 {
    width: 15%;
    font-size: 16px;
    font-family: var(--font--Bold);
    flex-shrink: 0;
    margin-right: 8px;
  }

  & div p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--gray500-color);
  }

  & div p strong {
    font-family: var(--font--Bold);
    color: var(--sub-color);
  }

  .delivery_date {
    margin-bottom: 24px;
  }
`;
