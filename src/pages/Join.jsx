import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "../components/common";
import { LeftDiv } from "../components/Carousel";

import ProfileImgDef from "../assets/profile_img_def.svg";
import PlusBtnImg from "../assets/add_button.svg";

import JoinTo from "../assets/Join to.svg";
import { BASE_URL } from "../utils";

export default function Join() {
  const navigate = useNavigate();
  const formRef = useRef();

  const [errorMSG, setErrorMSG] = useState("");
  const [profileSelectedImage, setProfileSelectedImage] = useState(null);

  const [joinData, setJoinData] = useState({
    user: {
      email: "",
      password: "",
      accountname: "",
      username: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJoinData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <OuterDiv>
      <LeftDiv />
      <RightDiv>
        <h1>
          <img src={JoinTo} alt="회원가입 페이지" />
        </h1>

        <ProfileDiv>
          <input id="fileInput" type="file" style={{ display: "none" }} accept="image/jpeg, image/png, image/svg" />
          <label htmlFor="fileInput">
            <ProfileImgWrap>
              <img className="button_img" src={profileSelectedImage ? BASE_URL + profileSelectedImage : ProfileImgDef} alt="Upload" style={profileSelectedImage ? { width: "100px" } : null} />
              <img className="add_button_img" src={PlusBtnImg} alt="Upload" style={{ cursor: "pointer" }} />
            </ProfileImgWrap>
          </label>
        </ProfileDiv>

        <Label>이메일</Label>
        <Input type="email" name="email" placeholder="유효한 이메일을 입력해주세요" />

        <Label>비밀번호</Label>
        <Input type="password" name="password" placeholder="비밀번호를 입력하세요" />

        <Label>닉네임</Label>
        <Input name="username" placeholder="Goodi에서 사용할 닉네임을 입력해주세요" />

        <Label>소개 메세지</Label>
        <textarea placeholder="나를 소개해보세요" name="intro" />

        <Button text="Goodi 시작하기" type="submit" br="none" />
      </RightDiv>
    </OuterDiv>
  );
}
export const OuterDiv = styled.div`
  display: flex;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  textarea {
    resize: none;
    border: 1px solid var(--gray300-color);
    width: 100%;
    min-height: 90px;
    border-radius: 4px;
    padding: 15px;
    box-sizing: border-box;
    outline-color: black;
    font-size: 1rem;
    margin-bottom: 15px;
    &::placeholder {
      color: var(--gray300-color);
      font-family: var(--font--Regular);
    }
  }
  input {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  font-family: var(--font--Bold);
  margin-bottom: 9px;
`;

const ErrorMassage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;
const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 30px;
`;
const ProfileImgWrap = styled.div`
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */
  .button_img {
    aspect-ratio: 1/ 1;
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
  }
  .add_button_img {
    position: absolute;
    top: 67px;
    left: 67px;
  }
`;
