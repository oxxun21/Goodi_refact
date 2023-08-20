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
import { setLoginCookie } from "../utils";

import { useRecoilState, useSetRecoilState } from "recoil";
import { loginCheck, loginToken, accountname } from "../recoil";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();

  const [token, setToken] = useRecoilState(loginToken);
  const setIsAccountname = useSetRecoilState(accountname);
  const [errorMSG, setErrorMSG] = useState("");
  const setIsLoginCheck = useSetRecoilState(loginCheck);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formRef.current.elements;

    const response = await loginAPI({ email: email.value, password: password.value });
    if (response.data.status === 422) {
      setErrorMSG(response.data.message);
    } else {
      setToken(response.data.user.token);
      setIsAccountname(response.data.user.accountname);
      setIsLoginCheck(true);
      setLoginCookie(token, { path: "/main" });
      navigate("/main");
    }
  };

  return (
    <OuterDiv>
      <LeftDiv />
      <RightDiv>
        <div className="right-inner">
          <h1>
            <img src={WelcomTo} alt="로그인 페이지" />
          </h1>
          <form ref={formRef} onSubmit={handleLogin}>
            <InputDiv>
              <label>이메일</label>
              <Input type="email" name="email" placeholder="이메일을 입력해주세요" required={true} />
            </InputDiv>
            <InputDiv>
              <label>비밀번호</label>
              <Input name="password" type="password" placeholder="비밀번호를 입력하세요" required={true} />
            </InputDiv>
            <ErrorMassage>{errorMSG}</ErrorMassage>
            <ButtonDiv>
              <Button type="submit" height="56px" text="로그인" />
            </ButtonDiv>
          </form>
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
        </div>
      </RightDiv>
    </OuterDiv>
  );
}

export const OuterDiv = styled.div`
  display: flex;
`;

export const RightDiv = styled.div`
  width: 57%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  margin: 0 auto;

  .right-inner {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
      height: 76px;
    }
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

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-family: var(--font--Bold);
    margin-bottom: 8px;
  }
`;

const ButtonDiv = styled.div`
  padding: 40px 0;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--gray200-color);
    position: absolute;
    bottom: -19px;
    left: 0;
  }
`;

const Span = styled.span`
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
  color: var(--gray200-color);
  z-index: 1;
`;

const SnsDiv = styled.div`
  display: flex;
  gap: 24px;
  padding: 4px 0 81px;
`;

const SnsBg = styled.div`
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
  display: block;
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;
