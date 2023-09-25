import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "../components/common";
import { LeftDiv } from "../components/Carousel";

import ProfileImgDef from "../assets/profile_img_def.svg";
import PlusBtnImg from "../assets/add_button.svg";
import JoinTo from "../assets/Join to.svg";

import { singUpAPI, uploadImageAPI } from "../api";

export default function Join() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [errorMSG, setErrorMSG] = useState("");
  const [profileSelectedImage, setProfileSelectedImage] = useState<string | null>(null);
  const [imageWrap, setImageWrap] = useState<string[]>([]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current instanceof HTMLFormElement) {
      const email = formElements.elements.namedItem("email") as HTMLInputElement;
      const password = formElements.elements.namedItem("password") as HTMLInputElement;
      const username = formElements.elements.namedItem("username") as HTMLInputElement;
      const intro = formElements.elements.namedItem("intro") as HTMLTextAreaElement;

      let accountName = email.value.split("@")[0];

      const response = await singUpAPI({
        username: username.value,
        email: email.value,
        password: password.value,
        accountname: accountName,
        intro: intro.value,
        image: imageWrap,
      });

      if (response?.data.status === 422) {
        setErrorMSG(response.data.message);
      } else {
        navigate("/login");
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = imageRef.current;
    if (image) {
      if (image.files && image.files.length > 0) {
        const file = image.files[0];
        const imageURL = await uploadImageAPI(file);
        setImageWrap(imageURL);

        if (e.target.files && e.target.files[0]) {
          const selectedImage = URL.createObjectURL(e.target.files[0]);
          setProfileSelectedImage(selectedImage);
        }
      }
    }
  };

  return (
    <OuterDiv>
      <LeftDiv />
      <RightDiv>
        <h1>
          <img src={JoinTo} alt="회원가입 페이지" />
        </h1>

        <Form ref={formRef as React.RefObject<HTMLFormElement>} onSubmit={handleSignup}>
          <ProfileDiv>
            <input name="image" id="fileInput" type="file" style={{ display: "none" }} accept="image/jpeg, image/png, image/svg" onChange={handleImageChange} ref={imageRef} />
            <label htmlFor="fileInput">
              <ProfileImgWrap>
                <img className="button_img" src={profileSelectedImage ? profileSelectedImage : ProfileImgDef} alt="Upload" style={profileSelectedImage ? { width: "100px" } : undefined} />
                <img className="add_button_img" src={PlusBtnImg} alt="Upload" style={{ cursor: "pointer" }} />
              </ProfileImgWrap>
            </label>
          </ProfileDiv>
          <label>이메일</label>
          <Input type="email" name="email" placeholder="유효한 이메일을 입력해주세요" required={true} />

          <label>비밀번호</label>
          <Input type="password" name="password" placeholder="비밀번호를 입력하세요" required={true} />

          <label>닉네임</label>
          <Input name="username" placeholder="Goodi에서 사용할 닉네임을 입력해주세요" required={true} />

          <label>소개 메세지</label>
          <textarea placeholder="나를 소개해보세요" name="intro" />

          <ErrorMassage>{errorMSG}</ErrorMassage>
          <Button text="Goodi 시작하기" type="submit" br="none" />
        </Form>
      </RightDiv>
    </OuterDiv>
  );
}
const OuterDiv = styled.div`
  display: flex;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  textarea {
    resize: none;
    border: 1px solid var(--gray300-color);
    font-family: var(--font--Regular);
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    font-family: var(--font--Bold);
    margin-bottom: 9px;
  }

  input {
    margin-bottom: 20px;
  }
`;

const ErrorMassage = styled.strong`
  font-family: var(--font--Bold);
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const ProfileImgWrap = styled.div`
  cursor: pointer;
  position: relative;

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
