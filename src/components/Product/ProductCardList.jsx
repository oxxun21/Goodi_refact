import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import { loginToken, checkProfile, checkDeletePost } from "../../recoil";

// api
import { productListAPI } from "../../api";

// 컴포넌트
import ProductCard from "./ProductCard";
import NoPostsUI from "../NoPostsUI";

import { BASE_URL, checkImageUrl } from "../../utils";

export default function ProductCardList({ accountname, profile }) {
  const token = useRecoilValue(loginToken);
  const checkProfileChange = useRecoilValue(checkProfile);
  const checkDelete = useRecoilValue(checkDeletePost);

  const [productGetData, setproductGetData] = useState(null);

  useEffect(() => {
    const productGet = async () => {
      try {
        const response = await productListAPI(accountname, token);
        setproductGetData(response);
      } catch (error) {
        console.error("Account API 에러가 발생했습니다", error);
      }
    };
    productGet();
  }, [accountname, checkProfileChange, checkDelete]);

  return (
    <>
      {productGetData === null || productGetData.data === 0 ? (
        <NoPostsUI />
      ) : (
        <CardList profile={profile}>
          {productGetData.product.map((productInfo) => {
            return (
              <ProductCard
                key={productInfo.id}
                id={productInfo.id}
                profile={checkImageUrl(productInfo.author.image, "profile")}
                name={productInfo.author.username}
                email={productInfo.author.accountname}
                img={checkImageUrl(BASE_URL + productInfo.itemImage.split(",")[0], "post")}
                title={productInfo.itemName}
                description={productInfo.link}
                price={productInfo.price}
              />
            );
          })}
        </CardList>
      )}
    </>
  );
}

const CardList = styled.div`
  margin: ${({ profile }) => (profile ? "30px 0 70px" : "80px 0")};
  display: grid;
  grid-template-columns: ${({ profile }) => (profile ? "repeat(3, 1fr)" : "repeat(2, 1fr)")};
  grid-template-rows: auto;
  gap: ${({ profile }) => (profile ? "60px 30px" : "60px")};
`;
