import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import account_name from "../recoil/accountname";

// api
import { accountProfileAPI } from "../api/profile";

// 컴포넌트
import Layout from "../layout/Layout";
import ProfileLeftUI from "../layout/profileLayout/ProfileLeftUI";
import ProfileRightUI from "../layout/profileLayout/ProfileRightUI";
import ProfileSkeleton from "./../style/skeletonUI/skeletonPage/ProfileSkeleton";
import { checkFollow } from "../recoil/checkChange";

export default function Profile() {
  const { accountname } = useParams();
  const [loading, setLoading] = useState(true);
  const [myProfile, setMyProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const myAccount = useRecoilValue(account_name);
  const checkFollowChange = useRecoilValue(checkFollow);

  useEffect(() => {
    setMyProfile(myAccount === accountname);
    const getProfileData = async () => {
      const res = await accountProfileAPI(accountname);
      setProfileData(res);
      setLoading(false);
    };
    getProfileData();
  }, [accountname, checkFollowChange]);

  return (
    <Layout reduceTop="true">
      <ProfileWrap>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <ProfileLeftUI setProfileData={setProfileData} myProfile={myProfile} accountname={accountname} profileData={profileData} />
            <ProfileRightUI accountname={accountname} />
          </>
        )}
      </ProfileWrap>
    </Layout>
  );
}

const ProfileWrap = styled.div`
  display: grid;
  grid-template-columns: 0.4fr auto;
  grid-template-rows: auto;
  gap: 30px;

  padding: 90px 60px 0 80px;
  box-sizing: border-box;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 330px;
    background: #000;
  }
`;
