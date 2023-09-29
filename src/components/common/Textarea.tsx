import React, { Ref } from "react";
import styled from "styled-components";

interface TextareaProps {
  hasError?: boolean;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  inputRef?: Ref<HTMLTextAreaElement>;
  placeholder?: string;
  maxLength?: number;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function Textarea({ inputRef, ...props }: TextareaProps) {
  return (
    <TextareaBoxWrap>
      <TextareaBox ref={inputRef} {...props}></TextareaBox>
      <p>최대 100자까지 입력 가능합니다.</p>
    </TextareaBoxWrap>
  );
}
const TextareaBoxWrap = styled.div`
  position: relative;
`;

const TextareaBox = styled.textarea<TextareaProps>`
  font-family: var(--font--Regular);
  resize: none;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#d3d3d3")};
  width: 100%;
  height: ${(props) => props.height};
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "4px")};
  &::placeholder {
    color: var(--gray300-color);
  }
  &:focus {
    border-color: black;
    outline: none;
  }

  & + p {
    position: absolute;
    right: 0;
    font-size: 14px;
    color: var(--gray400-color);
    text-align: right;
    margin-top: 8px;
  }
`;
