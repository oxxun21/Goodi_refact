import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Input, Button } from "../components/common";
import { LeftDiv } from "../components/Carousel";

import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";
import KakaoIcon from "../assets/kakao.svg";
import WelcomTo from "../assets/Welcome to.svg";

import { loginAPI } from "../api";
import { getLoginCookie, setLoginCookie } from "../utils";

import { useSetRecoilState } from "recoil";
import { accountname } from "../recoil";
import { instance } from "../api/instance";

const interceptorHeader = () => {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getLoginCookie()}`;
    return config;
  });
};

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const setIsAccountname = useSetRecoilState(accountname);
  const [errorMSG, setErrorMSG] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current instanceof HTMLFormElement) {
      const email = formElements.elements.namedItem("email") as HTMLInputElement;
      const password = formElements.elements.namedItem("password") as HTMLInputElement;
      const response = await loginAPI({ email: email.value, password: password.value });
      if (response.data.status === 422) {
        setErrorMSG(response.data.message);
      } else {
        const { token, accountname } = response.data.user;
        setIsAccountname(accountname);
        setLoginCookie(token, { path: "/" });

        interceptorHeader();
        navigate("/");
      }
    }
  };

  return (
    <OuterDiv>
      <LeftDiv />
      <RightDiv>
        <h1>
          <img src={WelcomTo} alt="로그인 페이지" />
        </h1>
        <Form ref={formRef} onSubmit={handleLogin}>
          <label>이메일</label>
          <Input type="email" name="email" placeholder="이메일을 입력해주세요" required={true} />

          <label>비밀번호</label>
          <Input name="password" type="password" placeholder="비밀번호를 입력하세요" required={true} />

          <ErrorMassage>{errorMSG}</ErrorMassage>

          <Button type="submit" text="로그인" />
        </Form>
        <Span>SNS 로그인</Span>
        <SnsDiv>
          <SnsBg bg="#FAE64D">
            <img src={KakaoIcon} alt="카카오로 로그인하기" />
          </SnsBg>
          <SnsBg bg="var(--gray100-color)">
            <img src={GoogleIcon} alt="구글로 로그인하기" />
          </SnsBg>
          <SnsBg bg="#5693FF">
            <img src={FacebookIcon} alt="페이스북으로 로그인하기" />
          </SnsBg>
        </SnsDiv>
        <div>
          <p>아직 구디 회원이 아니세요?</p>
          <Link to="/join">회원가입 하기</Link>
        </div>
      </RightDiv>
    </OuterDiv>
  );
}

const OuterDiv = styled.div`
  display: flex;
  height: 100dvh;

  & > div:first-of-type {
    width: 45%;
  }
  & > div:last-of-type {
    width: 55%;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 30px;
  }

  p {
    font-size: 16px;
    color: var(--gray500-color);
    display: inline;
    margin-right: 17px;
  }

  a {
    border-bottom: 2px solid black;
    font-size: 20px;
    font-family: var(--font--Bold);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 55%;
  box-sizing: border-box;

  label {
    font-family: var(--font--Bold);
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 20px;
  }

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--gray100-color);
    position: absolute;
    bottom: -38px;
    left: 0;
  }

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const Span = styled.span`
  margin: 20px 0;
  background-color: white;
  padding: 10px;
  color: var(--gray200-color);
  z-index: 1;
`;

const SnsDiv = styled.div`
  display: flex;
  gap: 24px;
  padding: 4px 0 60px;
`;

const SnsBg = styled.div<{ bg: string }>`
  background-color: ${(props) => props.bg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ErrorMassage = styled.strong`
  font-family: var(--font--Bold);
  margin-bottom: 15px;
  color: red;
  font-size: 14px;
`;
