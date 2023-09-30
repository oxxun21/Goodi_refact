import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  text?: string;
  bg?: string;
  width?: string;
  padding?: string;
  br?: string;
  color?: string;
  fontSize?: string;
  noCursor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
  disabled?: boolean;
  className?: string;
}

export default function Button({ text, ...props }: ButtonProps) {
  return <ButtonDef {...props}>{text}</ButtonDef>;
}

const ButtonDef = styled.button<ButtonProps>`
  background-color: ${(props) => props.bg || "var(--black-color)"};
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "18px 0"};
  border-radius: 4px;
  border: ${(props) => props.br || "1px solid var(--gray300-color)"};
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => props.fontSize || "18px"};
  font-family: var(--font--Medium);
  box-sizing: border-box;
  text-align: center;
  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--gray300-color);
    `}

  ${(props) =>
    props.noCursor &&
    css`
      cursor: default;
    `}

    &:active {
    transform: scale(0.99);
  }
`;
