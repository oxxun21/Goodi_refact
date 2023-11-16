import React, { useRef, useState } from "react";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { Input } from "../components/common";
import { useLocation } from "react-router-dom";
import { checkImageUrl, priceDivide } from "../utils";
import IconCheck from "../assets/icon_check_primary.svg";

interface UserInfo_I {
  address: string;
  name: string;
  phoneNumber: string;
}

export default function Purchase() {
  const location = useLocation();
  const cartItems: any[] = location.state;
  const formRef = useRef<HTMLFormElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo_I | null>(null);

  const calculateTotalPrice = () => {
    const priceComma = cartItems.reduce(
      (total, item) => total + item.productPrice * item.productCount || item.price * item.count,
      0
    );
    return priceDivide(priceComma);
  };

  const handleUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current instanceof HTMLFormElement) {
      const address = formElements.elements.namedItem("address") as HTMLInputElement;
      const name = formElements.elements.namedItem("name") as HTMLInputElement;
      const phoneNumber = formElements.elements.namedItem("phoneNumber") as HTMLInputElement;
      setUserInfo({ address: address.value, name: name.value, phoneNumber: phoneNumber.value });
    }
  };

  return (
    <Layout>
      <PurchaseWrap>
        <OrderSummary>
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
        </OrderSummary>
        <Payment>
          <PaymentForm>
            <h2>결제 정보 입력</h2>
            {userInfo ? (
              <>
                <strong>배송지</strong>
                <p>{userInfo.address}</p>
                <strong>구매자 이름</strong>
                <p>{userInfo.name}</p>
                <strong>구매자 연락처</strong>
                <p>{userInfo.phoneNumber}</p>
              </>
            ) : (
              <PaymentInfoForm ref={formRef} onSubmit={handleUserInfo}>
                <label htmlFor="address">배송지</label>
                <Input name="address" placeholder="배송지를 입력해주세요" required={true} />
                <label htmlFor="name">구매자 이름</label>
                <Input name="name" placeholder="구매자 이름을 입력해주세요" required={true} />
                <label htmlFor="phoneNumber">구매자 연락처</label>
                <Input name="phoneNumber" placeholder="구매자 전화번호를 입력해주세요" required={true} />

                <button type="submit">확인</button>
              </PaymentInfoForm>
            )}
          </PaymentForm>
          <PaymentAgree>
            <h3>결제수단</h3>
            <PaymentSelect>
              <li>
                <button>신용카드</button>
              </li>
              <li>
                <button>토스</button>
              </li>
              <li>
                <button>카카오페이</button>
              </li>
              <li>
                <button>네이버페이</button>
              </li>
              <li>
                <button>휴대폰결제</button>
              </li>
              <li>
                <button>계좌이체</button>
              </li>
            </PaymentSelect>
            <h3 className="a11y-hidden">이용 약관 동의</h3>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox"></label>
            <strong>모두 동의합니다</strong>
            <p>주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의합니다.</p>
          </PaymentAgree>
          <button>결제하기</button>
        </Payment>
      </PurchaseWrap>
    </Layout>
  );
}

const PurchaseWrap = styled.div`
  margin: 0 60px 120px 80px;
  display: flex;
  justify-content: space-between;
  gap: 64px;

  & > div {
    width: 50%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }

  & h2 {
    font-family: var(--font--Bold);
    font-size: 20px;
    margin-bottom: 1rem;
  }

  & h3 {
    font-family: var(--font--semibold);
    font-size: 18px;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1024px) {
    margin: 0px 40px 120px;
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 480px) {
    margin: 0px 20px 120px;
  }
`;

const OrderSummary = styled.div`
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

const Payment = styled.div`
  & > button {
    cursor: pointer;
    display: block;
    margin-left: auto;
    padding: 0.8rem 1.5rem;
    background: black;
    color: #fff;
    border-radius: 3px;
  }
`;

const PaymentForm = styled.div`
  & > strong {
    display: block;
    font-family: var(--font--semibold);
    margin-bottom: 8px;
  }

  & > p {
    padding: 5px 0;
    border-bottom: 1px solid var(--gray300-color);
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const PaymentInfoForm = styled.form`
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray300-color);
  & > label {
    display: block;
    margin-bottom: 8px;
  }

  & > input {
    margin-bottom: 1rem;
  }

  & > button {
    cursor: pointer;
    padding: 0.8rem 1.5rem;
    background: black;
    color: #fff;
    border-radius: 3px;
    display: block;
    margin-left: auto;
  }
`;

const PaymentSelect = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 5px;
  margin-bottom: 1rem;

  & li {
    border: 1px solid #eee;
    border-radius: 5px;
  }

  & button {
    font-size: 14px;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    padding: 14px;
    box-sizing: border-box;
  }

  & button:focus {
    background-color: var(--dark-sub-color);
    color: #fff;
  }
`;

const PaymentAgree = styled.div`
  & > h3 {
    margin-top: 1.5rem;
  }

  input#checkbox {
    display: none;
  }

  input#checkbox + label {
    cursor: pointer;
  }

  input#checkbox + label:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 17px;
    border: 1px solid #cbcbcb;
    vertical-align: middle;
    border-radius: 3px;
    transition: all 0.2s;
  }

  input#checkbox:checked + label:before {
    background: url(${IconCheck}) #000 no-repeat center/cover;
  }

  & > strong {
    margin-left: 8px;
  }

  & > p {
    margin-top: 8px;
    background-color: #eee;
    border-radius: 3px;
    font-size: 14px;
    padding: 0.8rem 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const NoProduct = styled.p`
  margin-bottom: 1.5rem;
`;
