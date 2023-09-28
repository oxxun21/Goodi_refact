import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { cartItemsState } from "../recoil";

import { Button } from "../components/common";
import Layout from "../layout/Layout";

import cartNullIcon from "../assets/cart_null_icon.svg";

import CartList from "../components/CartList/CartList";
import { priceDivide } from "../utils";

interface CartItem {
  id: number;
  productCount: number;
  productImage: string;
  productName: string;
  productPrice: number;
  userImage: string;
  userName: string;
}

export default function Cart() {
  const cartItem: CartItem[] = useRecoilValue(cartItemsState);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (cartItem.length !== 0) {
      navigate("/chat");
    }
  };

  const calculateTotalCount = () => {
    return cartItem.reduce((total, item) => total + item.productCount, 0);
  };

  const calculateTotalPrice = () => {
    const priceComma = cartItem.reduce((total, item) => total + item.productPrice * item.productCount, 0);
    return priceDivide(priceComma);
  };

  const cartRest = useResetRecoilState(cartItemsState);
  const cartResetButton = () => {
    cartRest();
  };

  return (
    <Layout reduceTop={true}>
      <h2 className="a11y-hidden">장바구니</h2>
      <CartWrap>
        <CartLeft>
          {cartItem.length === 0 ? (
            <CartNull>
              <img src={cartNullIcon} alt="장바구니 아이콘" />
              <p>현재 장바구니에 등록된 상품이 없어요</p>
              <Link to="/">상품 구경하기</Link>
            </CartNull>
          ) : (
            <ul>
              {cartItem.map((item) => (
                <CartList item={item} key={item.id} />
              ))}
            </ul>
          )}
        </CartLeft>
        <CartRight>
          <CartRightSticky>
            <CartRightTitle>주문 정보</CartRightTitle>
            <OrderInfo>
              <ul>
                <li>
                  <span>총 수량</span>
                  <span>{calculateTotalCount()} 개</span>
                </li>
                <li>
                  <span>총 상품금액</span>
                  <span>{calculateTotalPrice()} 원</span>
                </li>
                <li>
                  <span>총 배송비</span>
                  <span>0원</span>
                </li>
                <li>
                  <strong>총 주문금액</strong>
                  <strong>{calculateTotalPrice()} 원</strong>
                </li>
              </ul>
            </OrderInfo>
            <Button disabled={cartItem.length === 0} text="구매하고 싶어요" onClick={handleButtonClick} padding="16px 0" />
            <Button disabled={cartItem.length === 0} text="상품 전체 삭제" onClick={cartResetButton} bg="white" color="black" br="1px solid black" padding="16px 0" />
          </CartRightSticky>
        </CartRight>
      </CartWrap>
    </Layout>
  );
}

const CartWrap = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 64px;
  padding: 40px 50px 40px 80px;
`;

const CartLeft = styled.section`
  width: 60%;
  min-height: 550px;
`;

const CartNull = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin-bottom: 18px;
  }
  p {
    font-family: var(--font--Regular);
    color: var(--gray400-color);
    margin-bottom: 32px;
  }
  a {
    padding: 14px 40px;
    border: 2px solid var(--gray300-color);
    color: var(--gray400-color);
    text-decoration: none;
    border-radius: 4px;
  }
`;

const CartRight = styled.section`
  width: 40%;
  position: relative;
`;

const CartRightSticky = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;

  button {
    &:last-child {
      margin-top: 18px;
      transition: all 0.3s;
    }
    &:last-child:hover {
      background-color: #ff4747;
      color: white;
      border: 1px solid #ff4747;
    }
    &:disabled {
      color: white;
      border: 1px solid var(--gray100-color);
      pointer-events: none;
    }
  }
`;

const CartRightTitle = styled.h3`
  font-size: 24px;
  font-family: var(--font--Bold);
  margin-bottom: 15px;
`;

const OrderInfo = styled.div`
  width: 100%;
  padding: 20px 40px 30px;
  border: 1px solid var(--gray100-color);
  box-sizing: border-box;
  margin-bottom: 24px;

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray100-color);
    padding: 18px 0;
    font-family: var(--font--Medium);
    font-size: 16px;

    span {
      &:last-child {
        color: var(--gray500-color);
      }
    }

    &:last-child {
      border-bottom: none;
      padding: 32px 0 0 0;
      font-family: var(--font--Bold);
      font-size: 20px;
    }

    strong {
      &:last-child {
        color: var(--sub-color);
      }
    }
  }
`;
