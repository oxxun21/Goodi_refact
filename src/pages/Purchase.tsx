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
      (total, item) => total + item.productPrice || item.price * item.productCount || item.price,
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

  console.log(cartItems);
  console.log(userInfo);

  return (
    <Layout>
      <PurchaseWrap>
        <OrderSummary>
          <h2>주문 요약</h2>
          <h3>주문상품</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img
                  src={checkImageUrl(item.productImage || item.itemImage.split(",")[0], "post")}
                  alt={item.productName || item.itemName}
                />
                <strong>{item.productName || item.itemName}</strong>
                <p>{priceDivide(item.productPrice || item.price)}</p>
              </li>
            ))}
          </ul>
          <h3>최종 결제금액</h3>
          <strong>{calculateTotalPrice()} 원</strong>
        </OrderSummary>
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
            <form ref={formRef} onSubmit={handleUserInfo}>
              <label htmlFor="address">배송지</label>
              <Input name="address" placeholder="배송지를 입력해주세요" required={true} />
              <label htmlFor="name">구매자 이름</label>
              <Input name="name" placeholder="구매자 이름을 입력해주세요" required={true} />
              <label htmlFor="phoneNumber">구매자 연락처</label>
              <Input name="phoneNumber" placeholder="구매자 전화번호를 입력해주세요" required={true} />
              <button type="submit">확인</button>
              <button type="button">수정</button>
            </form>
          )}
          <h3>결제수단</h3>
          <ul>
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
          </ul>
        </PaymentForm>
        <PaymentAgree>
          <h3 className="a11y-hidden">이용 약관 동의</h3>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox"></label>
          <strong>모두 동의합니다</strong>
          <p>주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의합니다.</p>
        </PaymentAgree>
        <button>결제하기</button>
      </PurchaseWrap>
    </Layout>
  );
}

const PurchaseWrap = styled.div`
  margin: 0 60px 120px 80px;
  /* display: flex;
  justify-content: space-between; */

  @media screen and (max-width: 1024px) {
    margin: 0px 40px 120px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 480px) {
    margin: 0px 20px 120px;
  }
`;

const OrderSummary = styled.div``;

const PaymentForm = styled.div``;

const PaymentAgree = styled.div`
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
  }

  input#checkbox:checked + label:before {
    background: url(${IconCheck}) #000 no-repeat center/cover;
  }
`;
