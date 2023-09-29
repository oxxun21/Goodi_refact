import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

import sendBtn from "../../assets/icon-send-gray.svg";
import sendBtnHover from "../../assets/icon-send-black.svg";

interface FormProps {
  hasInput: string;
  setHasInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function Form({ hasInput, setHasInput, handleSubmit }: FormProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasInput(e.target.value);
  };
  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormInput type="text" placeholder="메시지를 입력해주세요" onChange={handleInputChange} value={hasInput} />
      <FormButton type="submit" hasInput={hasInput} />
    </FormLayout>
  );
}

const FormLayout = styled.form`
  padding: 24px 32px 50px 32px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid var(--gray200-color);
`;

const FormInput = styled.input`
  width: 100%;
  &::placeholder {
    color: var(--gray300-color);
  }
`;

const FormButton = styled.button<{ hasInput: string }>`
  background: ${({ hasInput }) => (hasInput === "" ? `url(${sendBtn}) no-repeat center center/contain` : `url(${sendBtnHover}) no-repeat center center/contain`)};
  width: 32px;
  height: 32px;
  transition: all 0.3s;
  cursor: pointer;
`;
