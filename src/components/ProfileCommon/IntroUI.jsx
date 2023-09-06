import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 컴포넌트
import { ButtonLineIcon, ButtonFollow } from "../common";

// 이미지 검사
import { checkImageUrl } from "../../utils";
import { accountname } from "../../recoil";
import { useRecoilValue } from "recoil";

export default function IntroUI({ profileData, handleEditClick }) {
  const navigate = useNavigate();
  const myAccount = useRecoilValue(accountname);

  return (
    <>
      <IntroWrap>
        <img src={checkImageUrl(profileData.image, "profile")} alt="유저 프로필 이미지" />
        <strong>{profileData.username}</strong>
        <p>{profileData.accountname}</p>
      </IntroWrap>

      {myAccount === profileData.accountname ? (
        <ButtonLineIcon text="프로필 수정하기" onClick={handleEditClick} basic="true" />
      ) : (
        <BtnWrap>
          <ButtonLineIcon text="작가랑 채팅하기" basic="true" bg="black" color="white" br="none" onClick={() => navigate("/chat")} />
          <ButtonFollow isFollow={profileData.isfollow} accountName={profileData.accountname} padding="true" />
        </BtnWrap>
      )}

      <p>{profileData.intro || "아직 소개글이 없어요!"}</p>
    </>
  );
}

const IntroWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 100px;
    margin-bottom: 18px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
  }

  strong {
    font-family: var(--font--semibold);
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-family: var(--font--Regular);
    font-size: 18px;
    color: var(--gray400-color);
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
