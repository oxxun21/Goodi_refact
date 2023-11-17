import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../common";

export interface UserInfo_I {
  address: string;
  name: string;
  phoneNumber: string;
}

export default function PaymentInputForm() {
  const [userInfo, setUserInfo] = useState<UserInfo_I | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current instanceof HTMLFormElement) {
      const address = formElements.elements.namedItem("address") as HTMLInputElement;
      const name = formElements.elements.namedItem("name") as HTMLInputElement;
      const phoneNumber = formElements.elements.namedItem("phoneNumber") as HTMLInputElement;
      setUserInfo({ address: address.value, name: name.value, phoneNumber: phoneNumber.value });
    }
  };

  return (
    <>
      {userInfo ? (
        <>
          <strong>배송지</strong>
          <p>{userInfo.address}</p>
          <strong>구매자 이름</strong>
          <p>{userInfo.name}</p>
          <strong>구매자 연락처</strong>
          <p>{userInfo.phoneNumber}</p>
        </>
      ) : (
        <Form ref={formRef} onSubmit={handleUserInfo}>
          <label htmlFor="address">배송지</label>
          <Input name="address" placeholder="배송지를 입력해주세요" required={true} />
          <label htmlFor="name">구매자 이름</label>
          <Input name="name" placeholder="구매자 이름을 입력해주세요" required={true} />
          <label htmlFor="phoneNumber">구매자 연락처</label>
          <Input name="phoneNumber" placeholder="구매자 전화번호를 입력해주세요" required={true} />
          <Button text="확인" padding="0.8rem" fontSize="16px" width="80px" />
        </Form>
      )}
    </>
  );
}

const Form = styled.form`
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray300-color);
  & > label {
    display: block;
    margin-bottom: 8px;
  }

  & > input {
    margin-bottom: 1rem;
  }

  & > button {
    display: block;
    margin-left: auto;
  }
`;
