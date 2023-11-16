import React from "react";
import { checkImageUrl, priceDivide } from "../../utils";
import styled from "styled-components";

export default function OrderSummary({ cartItems }: { cartItems: any[] }) {
  const calculateTotalPrice = () => {
    const priceComma = cartItems.reduce(
      (total, item) => total + item.productPrice * item.productCount || item.price * item.count,
      0
    );
    return priceDivide(priceComma);
  };

  return (
    <OrderSummaryContain>
      <h2>주문 요약</h2>
      <h3>주문상품</h3>
      {cartItems === null ? (
        <NoProduct>상품이 없습니다. 다시 시도해주세요.</NoProduct>
      ) : (
        <CartItemList>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img
                src={checkImageUrl(item.productImage || item.itemImage.split(",")[0], "post")}
                alt={item.productName || item.itemName}
              />
              <div>
                <strong>{item.productName || item.itemName}</strong>
                <p>수량 : {item.productCount || item.count}개</p>
                <p>가격 : {priceDivide(item.productPrice * item.productCount || item.price * item.count)}원</p>
              </div>
            </li>
          ))}
        </CartItemList>
      )}
      <div>
        <h3>최종 결제금액</h3>
        <strong>{cartItems === null ? 0 : calculateTotalPrice()} 원</strong>
      </div>
    </OrderSummaryContain>
  );
}

const OrderSummaryContain = styled.div`
  & img {
    width: 20%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;
    border-top: 1px solid var(--gray300-color);

    & > h3 {
      margin-bottom: 0;
    }
  }
`;

const CartItemList = styled.ul`
  width: 100%;
  margin-bottom: 1.5rem;

  & > li {
    display: flex;
    max-height: 100px;
    gap: 1rem;
    margin-bottom: 2rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  & > li > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    & > strong {
      width: 100%;
      font-family: var(--font--Medium);
      display: block;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--gray300-color);
      @media screen and (max-width: 480px) {
        border-bottom: 0;
      }
    }
  }
`;

const NoProduct = styled.p`
  margin-bottom: 1.5rem;
`;
