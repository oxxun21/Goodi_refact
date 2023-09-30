import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import { checkDeletePost } from "../../recoil";

// api
import { productListAPI } from "../../api";

// 컴포넌트
import ProductCard from "./ProductCard";
import NoPostsUI from "../NoPostsUI";

import { BASE_URL, checkImageUrl } from "../../utils";
import { ProductList_I } from "../../interface";

interface ProductCarListProps {
  accountname: string;
  profile: boolean;
}

export default function ProductCardList({ accountname, profile }: ProductCarListProps) {
  const checkDelete = useRecoilValue(checkDeletePost);

  const [productGetData, setproductGetData] = useState<ProductList_I[] | null>(null);

  useEffect(() => {
    const productGet = async () => {
      try {
        const response = await productListAPI(accountname as string);
        setproductGetData(response.product);
      } catch (error) {
        console.error("Account API 에러가 발생했습니다", error);
      }
    };
    productGet();
  }, [accountname, checkDelete]);

  return (
    <>
      {productGetData === null || productGetData.length === 0 ? (
        <NoPostsUI />
      ) : (
        <CardList profile={profile}>
          {productGetData.map((productInfo) => {
            return (
              <ProductCard
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

const CardList = styled.div<{ profile?: boolean }>`
  margin: ${({ profile }) => (profile ? "30px 0 70px" : "80px 0")};
  display: grid;
  grid-template-columns: ${({ profile }) => (profile ? "repeat(3, 1fr)" : "repeat(2, 1fr)")};
  grid-template-rows: auto;
  gap: ${({ profile }) => (profile ? "60px 30px" : "60px")};
`;
