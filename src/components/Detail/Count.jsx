import React, { useState } from "react";
import styled from "styled-components";

//image
import PlusIcon from "../../assets/icon_plus_black.svg";
import MinusIcon from "../../assets/icon_minus_black.svg";

export default function Count({ getPrice, money, productPrice, setCount, count }) {
  // 카운트 증가 함수
  const increaseHandler = () => {
    setCount(count + 1);
    getPrice(money + productPrice);
  };

  // 카운트 감소 함수
  const decreaseHandler = () => {
    if (count > 1) {
      setCount(count - 1);
      getPrice(money - productPrice);
    }
  };

  return (
    <Countwrap>
      <MinusButton
        onClick={() => {
          decreaseHandler();
        }}
      >
        <img src={MinusIcon} alt="빼기 아이콘" />
      </MinusButton>
      <p className="count_text">{count}</p>
      <PluseButton
        onClick={() => {
          increaseHandler();
        }}
      >
        <img src={PlusIcon} alt="더하기 아이콘" />
      </PluseButton>
    </Countwrap>
  );
}

const Countwrap = styled.section`
  display: flex;
  align-items: center;

  .count_text {
    font-family: var(--font--Medium);
    font-size: 24px;
    width: 110px;
    text-align: center;
  }

  & button {
    width: 40px;
    height: 40px;
    background-color: var(--gray100-color);
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
  }

  & button:focus {
    outline: 1px solid #ff1515;
  }

  & button img {
    width: 24px;
  }

  & button:active {
    background-color: var(--gray200-color);
    transform: scale(0.9);
  }
`;
const PluseButton = styled.button``;
const MinusButton = styled.button``;
