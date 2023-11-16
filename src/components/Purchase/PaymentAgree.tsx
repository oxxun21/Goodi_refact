import React, { useState } from "react";
import IconCheck from "../../assets/icon_check_primary.svg";
import styled from "styled-components";

export default function PaymentAgree() {
  const [selectedButton, setSelectedButton] = useState<Number | null>(null);

  const handleButtonClick = (index: Number | null) => {
    setSelectedButton(index === selectedButton ? null : index);
  };

  const paymentType = ["신용카드", "토스", "카카오페이", "네이버페이", "휴대폰결제", "계좌이체"];

  return (
    <PaymentAgreeContain>
      <h3>결제수단</h3>
      <PaymentSelect>
        {paymentType.map((type, index) => (
          <li key={index} className={selectedButton === index ? "selected" : ""}>
            <button onClick={() => handleButtonClick(index)}>{type}</button>
          </li>
        ))}
      </PaymentSelect>
      <h3 className="a11y-hidden">이용 약관 동의</h3>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox"></label>
      <strong>모두 동의합니다</strong>
      <p>
        주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의합니다.
        <br />* 이 페이지는 화면만 구현되어 있어, 결제가 진행되지 않습니다.
      </p>
    </PaymentAgreeContain>
  );
}

const PaymentSelect = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 5px;
  margin-bottom: 1rem;

  & li {
    border: 1px solid #eee;
    border-radius: 5px;
    transition: all 0.2s;
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

  .selected {
    background-color: var(--dark-sub-color);
    color: #fff;
  }
`;

const PaymentAgreeContain = styled.div`
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
