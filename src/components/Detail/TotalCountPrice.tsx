import React, { useState } from "react";
import styled from "styled-components";
import Count from "./Count";
import { Button, Toast } from "../common";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../recoil";
import { useNavigate } from "react-router";
import { priceDivide } from "../../utils";
import { productList_I } from "../../interface/product_I";
import { cartItem } from "../../interface/cart_I";

export default function TotalCountPrice({ productData }: { productData: productList_I }) {
  const [totalPrice, setTotalPrice] = useState(productData.price);
  const [count, setCount] = useState(1);
  const [toast, setToast] = useState(false);

  // 장바구니 상태
  const [cartItem, setCartItem] = useRecoilState(cartItemsState);
  const navigate = useNavigate();
  const addToCart = () => {
    const newItem = {
      userImage: productData.author.image,
      userName: productData.author.username,
      id: productData.id,
      productName: productData.itemName,
      productPrice: productData.price,
      productImage: productData.itemImage.split(",")[0],
      productCount: count,
    };

    setToast(true);

    const existingItem = cartItem.find((cartItem: cartItem) => cartItem.id === newItem.id);

    if (existingItem) {
      // 이미 장바구니에 있는 상품인 경우
      const updatedItems = cartItem.map((cartItem: cartItem) => (cartItem.id === newItem.id ? { ...cartItem, productCount: cartItem.productCount + count } : cartItem));
      setCartItem(updatedItems);
    } else {
      // 장바구니에 없는 상품인 경우
      setCartItem([...cartItem, newItem]);
    }
  };

  return (
    <>
      {toast && <Toast setToast={setToast} text="장바구니에 상품이 담겼습니다." />}
      <h3 className="product_count_subtitle">수량</h3>
      <Count productPrice={productData.price} setTotalPrice={setTotalPrice} count={count} setCount={setCount} />
      <hr />
      <ProductPrice>
        <h3 className="product_price_subtitle">총 결제 금액</h3>
        <p className="product_price">
          <strong>{priceDivide(totalPrice)}</strong>원
        </p>
      </ProductPrice>
      <ButtonWrap>
        <Button text="장바구니 담기" className="cart_button" type="button" bg="white" color="var(--black-color)" onClick={addToCart} />
        <Button text="구매하고 싶어요" className="purchase_button" type="button" bg="black" br="none" onClick={() => navigate("/chat")} />
      </ButtonWrap>
    </>
  );
}

const ProductPrice = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .product_price_subtitle {
    font-family: var(--font--Bold);
    color: var(--gray400-color);
  }

  .product_price {
    font-family: var(--font--Medium);
    font-size: 18px;
    color: var(--gray400-color);
    display: flex;
    align-items: center;
  }

  .product_price strong {
    font-family: var(--font--Bold);
    color: var(--black-color);
    font-size: 36px;
    margin-right: 6px;
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  margin-top: 32px;
  align-items: center;
  gap: 2%;

  & button {
    cursor: pointer;
    font-family: var(--font--Medium);
  }
`;
