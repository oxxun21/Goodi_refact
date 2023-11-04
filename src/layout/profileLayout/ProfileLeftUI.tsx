import React, { useState } from "react";
import styled from "styled-components";

// 컴포넌트
import IntroUI from "../../components/ProfileCommon/IntroUI";
import FollowListUI from "../../components/ProfileCommon/FollowListUI";
import UpdateProfile from "../../components/ProfileCommon/UpdateProfile";

import { ProfileInfo_I } from "../../interface";

interface ProfileLeftUIProps {
  profileData?: ProfileInfo_I;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProfileLeftUI({ profileData, setProfileData }: ProfileLeftUIProps) {
  // 프로필 정보 수정
  const [isEditing, setIsEditing] = useState(false);

  // 프로필 수정 버튼 이벤트
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <ProfileLeft>
          <h2 className="a11y-hidden">사용자 프로필 수정</h2>
          <UpdateProfile profileData={profileData as ProfileInfo_I} setIsEditing={setIsEditing} setProfileData={setProfileData} />
        </ProfileLeft>
      ) : (
        <ProfileLeft>
          <h2 className="a11y-hidden">사용자 프로필</h2>
          <IntroUI profileData={profileData as ProfileInfo_I} handleEditClick={handleEditClick} />
          <FollowListUI profileData={profileData as ProfileInfo_I} />
        </ProfileLeft>
      )}
    </>
  );
}

const ProfileLeft = styled.section`
  min-width: 370px;
  height: fit-content;
  padding: 60px 24px 45px;
  background-color: #fff;
  border: 1px solid var(--gray300-color);
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;

  & > button {
    margin: 0 auto;
  }

  & > p {
    text-align: center;
    color: var(--gray500-color);
    font-size: 16px;
    font-family: var(--font--Regular);
    line-height: 1.3;
    text-align: justify;
  }
  @media screen and (max-width: 1024px) {
    min-width: auto;
    height: 960px;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 60px;
  }
  @media only screen and (max-width: 480px) {
  }
`;
