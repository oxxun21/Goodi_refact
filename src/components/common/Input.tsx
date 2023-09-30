import React from "react";
import styled from "styled-components";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  backgroundColor?: string;
  borderRadius?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string;
}

export default function Input(props: InputProps) {
  return <InputBox {...props} />;
}

export const InputBox = styled.input<InputProps>`
  border: 1px solid ${(props) => (props.hasError ? "red" : "#d3d3d3")};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "48px"};
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "4px")};
  &::placeholder {
    color: var(--gray300-color);
  }
  &:focus {
    border-color: black;
  }
`;
