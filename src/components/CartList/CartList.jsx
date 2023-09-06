import React from "react";
import styled from "styled-components";

import iconClose from "../../assets/icon_close.svg";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../recoil";
import { checkImageUrl, priceDivide } from "../../utils";

export default function CartList({ item }) {
  const [cartItem, setCartItem] = useRecoilState(cartItemsState);

  const removeItem = (itemId) => {
    const updatedItems = cartItem.filter((item) => item.id !== itemId);
    setCartItem(updatedItems);
  };

  return (
    <CartProductItem>
      <CartUserInfo>
        <img src={checkImageUrl(item.userImage, "profile")} alt="판매자 프로필 이미지" />
        <strong>{item.userName}</strong>
        <button onClick={() => removeItem(item.id)}>
          <img src={iconClose} alt="상품 삭제 버튼" />
        </button>
      </CartUserInfo>
      <CartProductInfo>
        <img src={checkImageUrl(item.productImage, "post")} alt="" />
        <CartProductDesc>
          <p>No. {item.id}</p>
          <strong>{item.productName}</strong>
          <p>{priceDivide(item.productPrice)} 원</p>
          <CartProductTotal>
            <strong>{priceDivide(item.productPrice * item.productCount)} 원</strong>
            <span>수량 {item.productCount}개</span>
          </CartProductTotal>
        </CartProductDesc>
      </CartProductInfo>
    </CartProductItem>
  );
}

const CartProductItem = styled.li`
  border: 1px solid #ebebeb;
  border-radius: 0 0 4px 4px;
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CartUserInfo = styled.div`
  width: 100%;
  height: 50px;
  background-color: var(--gray100-color);
  display: flex;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  & > strong {
    font-size: 16px;
    font-family: var(--font--semibold);
  }

  & > button {
    width: 40px;
    height: 40px;
    margin-left: auto;
    cursor: pointer;

    & > img {
      display: block;
      margin: 0 auto;
    }
  }
`;

const CartProductInfo = styled.div`
  width: 100%;
  padding: 18px 24px 20px;
  box-sizing: border-box;
  display: flex;
  gap: 28px;

  & > img {
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

const CartProductDesc = styled.div`
  width: 100%;
  p {
    margin-bottom: 14px;

    &:first-child {
      margin-top: 5px;
      font-size: 14px;
      color: var(--gray400-color);
    }
    &:last-child {
      font-size: 16px;
    }
  }

  strong {
    display: block;
    font-family: var(--font--semibold);
    font-size: 20px;
    margin-bottom: 14px;
  }
`;

const CartProductTotal = styled.div`
  width: 100%;
  border-top: 1px solid var(--gray100-color);
  padding-top: 18px;
  display: flex;
  justify-content: space-between;

  strong {
    font-family: var(--font--Bold);
    font-size: 20px;
  }

  span {
    font-family: var(--font--Medium);
    color: var(--dark-sub-color);
    font-size: 18px;
  }
`;
