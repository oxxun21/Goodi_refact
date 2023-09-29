import React from "react";
import styled, { css } from "styled-components";
import PlusIcon from "../../../assets/icon_plus_primary.svg";

interface ButtonLineIconProps {
  text?: string;
  height?: string;
  bg?: string;
  br?: string;
  basic?: string;
}

export default function ButtonLineIcon({ text, ...props }: ButtonLineIconProps) {
  return <ButtonLineIconUI {...props}>{text}</ButtonLineIconUI>;
}

const ButtonLineIconUI = styled.button<ButtonLineIconProps>`
  height: ${(props) => props.height || "50px"};
  padding: 18px 16px;
  background-color: ${(props) => props.bg || "white"};
  color: ${(props) => props.color || "black"};
  border-radius: 30px;
  border: 1px solid var(--gray200-color);
  border: ${(props) => props.br || "1px solid var(--gray200-color)"};
  font-size: 15px;
  font-family: var(--font--semibold);
  cursor: pointer;

  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  box-sizing: border-box;
  white-space: nowrap;

  ${({ basic }) =>
    basic &&
    css`
      &:hover {
        background-color: var(--sub-color);
        border: none;
        transition: all 0.3s;
        color: white;
      }
    `}

  ${({ basic }) =>
    basic ||
    css`
      &::after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        background: url(${PlusIcon}) no-repeat center/cover;
      }

      &:hover {
        color: white;
        background-color: var(--black-color);
        border: none;
        transition: all 0.5s;
      }
    `}
`;
