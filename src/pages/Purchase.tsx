import React from "react";
import Layout from "../layout/Layout";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import OrderSummary from "../components/Purchase/OrderSummary";
import Payment from "../components/Purchase/Payment";

export default function Purchase() {
  const location = useLocation();
  const cartItems: any[] = location.state;
  return (
    <Layout>
      <PurchaseWrap>
        <OrderSummary cartItems={cartItems} />
        <Payment />
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
    gap: 35px;
  }
  @media only screen and (max-width: 480px) {
    margin: 0px 20px 120px;
  }
`;
