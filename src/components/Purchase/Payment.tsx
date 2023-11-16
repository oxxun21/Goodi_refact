import React from "react";
import styled from "styled-components";
import PaymentInputForm from "./PaymentInputForm";
import PaymentAgree from "./PaymentAgree";

export default function Payment() {
  return (
    <PaymentContain>
      <PaymentForm>
        <h2>결제 정보 입력</h2>
        <PaymentInputForm />
      </PaymentForm>
      <PaymentAgree />
      <button>결제하기</button>
    </PaymentContain>
  );
}

const PaymentContain = styled.div`
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
