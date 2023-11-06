import React from "react";
import styled from "styled-components";
import { useState } from "react";

//image
import ProductBanner from "../../assets/product_banner.svg";
import LeftArrow from "../../assets/icon_arrow_left.svg";
import RightArrow from "../../assets/icon_arrow_right.svg";
import { checkImageUrl } from "../../utils";

export default function DetailImage({ img }: { img: string[] }) {
  //이미지 index 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  //다음 버튼을 index + 1
  const handlerNext = () => {
    setCurrentIndex((nextIndex) => (nextIndex === img.length - 1 ? 0 : nextIndex + 1));
  };

  //이전 버튼을 index - 1
  const handlerRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? img.length - 1 : prevIndex - 1));
  };

  //타겟 이미지를 눌렀을때 해당 이미지 인덱스로 변경
  const handleSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <ProductDetailImg>
      <h3 className="a11y-hidden">제품 상세이미지</h3>
      <div className="top_img_wrap">
        <img className="common_banner" src={ProductBanner} alt="상품 상세 공통 배너" />
        <img className="top_detail_img" src={checkImageUrl(img[currentIndex], "post")} alt="상세 이미지" />

        <LeftButton type="button" onClick={handlerRight}></LeftButton>
        <RightButton type="button" onClick={handlerNext}></RightButton>
      </div>

      <div className="bottom_img_wrap">
        {img.map((el, index) => {
          return (
            <img
              style={{ cursor: "pointer" }}
              key={index}
              className={`detail_img ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleSlide(index)}
              src={checkImageUrl(el, "post")}
              alt="상세 이미지"
            />
          );
        })}
      </div>
    </ProductDetailImg>
  );
}

const ProductDetailImg = styled.div`
  width: 40%;

  .top_img_wrap {
    position: relative;
  }

  .common_banner {
    width: 100%;
  }

  .top_detail_img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  & button {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background-color: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  & button:focus {
    outline: 1px solid #ff1515;
  }

  .bottom_img_wrap {
    margin-top: 16px;
    display: flex;
    gap: 3%;
  }

  .detail_img {
    width: 20%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    box-sizing: border-box;
  }

  .active {
    border: 3px solid var(--main-color);
    border-radius: 4px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftButton = styled.button`
  left: 5%;
  &::before {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    background: url(${LeftArrow}) no-repeat center/cover;
    margin: 0 auto;
  }
`;

const RightButton = styled.button`
  right: 5%;

  &::before {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    background: url(${RightArrow}) no-repeat center/cover;
    margin: 0 auto;
  }
`;
