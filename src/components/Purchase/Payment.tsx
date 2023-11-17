import React from "react";
import styled from "styled-components";
import PaymentInputForm from "./PaymentInputForm";
import PaymentAgree from "./PaymentAgree";
import { Button } from "../common";

export default function Payment() {
  return (
    <PaymentContain>
      <PaymentForm>
        <h2>결제 정보 입력</h2>
        <PaymentInputForm />
      </PaymentForm>
      <PaymentAgree />
      <Button text="결제하기" fontSize="16px" width="130px" padding="0.8rem" />
    </PaymentContain>
  );
}

const PaymentContain = styled.div`
  & > button {
    display: block;
    margin-left: auto;
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
