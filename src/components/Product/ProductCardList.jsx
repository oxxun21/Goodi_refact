import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import { checkProfile, checkDeletePost } from "../../recoil";

// api
import { productListAPI } from "../../api";

// 컴포넌트
import ProductCard from "./ProductCard";
import NoPostsUI from "../NoPostsUI";

import { BASE_URL, checkImageUrl } from "../../utils";

export default function ProductCardList({ accountname, profile }) {
  const checkProfileChange = useRecoilValue(checkProfile);
  const checkDelete = useRecoilValue(checkDeletePost);

  const [productGetData, setproductGetData] = useState(null);

  const [isHidden, setIsHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLocalNav = () => {
    setIsHidden((prevState) => !prevState);
  };

  // 바깥쪽 눌렀을때 로컬네비 꺼짐
  useEffect(() => {
    const handleClickOutside = () => {
      const localNavElement = document.getElementById("localNavElement");

      if (localNavElement) {
        setIsHidden(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const productGet = async () => {
      try {
        const response = await productListAPI(accountname);
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
                handleLocalNav={handleLocalNav}
                setIsHidden={setIsHidden}
                handleModal={handleModal}
                isHidden={isHidden}
                showModal={showModal}
                setShowModal={setShowModal}
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
