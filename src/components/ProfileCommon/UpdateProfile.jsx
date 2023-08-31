import React, { useState } from "react";
import styled from "styled-components";

// 리코일
import { useRecoilState } from "recoil";
import { checkProfile } from "../../recoil";

// api
import { updateProfile, uploadImageAPI } from "../../api";

// 컴포넌트
import { Input, Button } from "../common";

// 이미지
import PlusBtnImg from "../../assets/add_button.svg";
// 이미지 검사
import { checkImageUrl } from "../../utils";

export default function UpdateProfile({ profileData, setIsEditing, setProfileData }) {
  // 수정 관련 state
  const [changeImageURL, setChangeImageURL] = useState(profileData.image);
  const [userName, setUserName] = useState(profileData.username);
  const [intro, setIntro] = useState(profileData.intro);
  const [checkProfileChange, setCheckProfileChange] = useRecoilState(checkProfile);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imgSrc = await uploadImageAPI(file);

    setChangeImageURL(imgSrc);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    const updatedProfileData = {
      ...profileData,
      username: userName,
      intro: intro,
      image: changeImageURL,
    };

    setProfileData(updatedProfileData);
    updateProfile({
      username: userName,
      intro: intro,
      image: changeImageURL,
    });
    setIsEditing(false);
    setCheckProfileChange((prev) => !prev);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else {
      setIntro(value);
    }
  };

  return (
    <>
      <ProfileDiv>
        <input id="fileInput" type="file" style={{ display: "none" }} accept="image/jpeg, image/png, image/svg" onChange={handleImageChange} />
        <label htmlFor="fileInput">
          <ProfileImgWrap>
            <img src={checkImageUrl(changeImageURL, "profile")} alt="Upload" />
          </ProfileImgWrap>
          <img className="add_button_img" src={PlusBtnImg} alt="Upload" style={{ cursor: "pointer" }} />
        </label>
      </ProfileDiv>
      <Form onSubmit={handleSaveClick}>
        <div>
          <Label>닉네임</Label>
          <Input required width="100%" height="48px" padding="15px" name="username" value={userName} onChange={handleInputChange} placeholder="변경할 닉네임을 입력해주세요" />
        </div>
        <div>
          <Label>소개 메세지</Label>
          <textarea placeholder="소개 글을 입력해주세요" name="intro" value={intro} onChange={handleInputChange}></textarea>
        </div>
        <Button text="수정 취소" type="button" bg="white" color="black" width="100%" padding="14px 0" fontSize="16px" onClick={handleCancelClick} />
        <Button text="수정 완료" type="submit" bg="black" width="100%" padding="14px 0" fontSize="16px" br="none" />
      </Form>
    </>
  );
}

const ProfileImgWrap = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  & > img {
    width: 110px;
    aspect-ratio: 1/ 1;
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const ProfileDiv = styled.div`
  position: relative;
  margin-bottom: 30px;
  .add_button_img {
    position: absolute;
    top: 70px;
    left: 70px;
  }
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;

  & > div:first-child {
    margin-bottom: 32px;
  }

  textarea {
    resize: none;
    border: 1px solid var(--gray300-color);
    width: 100%;
    min-height: 130px;
    border-radius: 4px;
    padding: 15px;
    box-sizing: border-box;
    outline-color: black;
    font-family: var(--font--Regular);
    font-size: 1rem;
    &::placeholder {
      color: var(--gray300-color);
      font-family: var(--font--Regular);
      font-size: 1rem;
    }
  }

  button {
    margin-top: 30px;

    &:last-child {
      margin-top: 15px;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 9px;
  font-family: var(--font--Bold);
  font-weight: 700;
`;
