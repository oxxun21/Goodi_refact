import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import { checkFollow } from "../recoil";

// api
import { accountProfileAPI } from "../api";

// 컴포넌트
import Layout from "../layout/Layout";
import ProfileLeftUI from "../layout/profileLayout/ProfileLeftUI";
import ProfileRightUI from "../layout/profileLayout/ProfileRightUI";
import ProfileSkeleton from "../style/skeletonUI/skeletonPage/ProfileSkeleton";

import { ProfileInfo_I } from "../interface";

export default function Profile() {
  const { accountname } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileInfo_I | undefined>(undefined);
  const checkFollowChange = useRecoilValue(checkFollow);

  useEffect(() => {
    const getProfileData = async () => {
      if (typeof accountname === "string") {
        const res = await accountProfileAPI({ accountname });
        setProfileData(res);
        setLoading(false);
      }
    };
    getProfileData();
  }, [accountname, checkFollowChange]);

  return (
    <Layout reduceTop={true}>
      <ProfileWrap>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <ProfileLeftUI setProfileData={setProfileData} profileData={profileData} />
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
    @media screen and (max-width: 1024px) {
      height: 1220px;
    }
    @media screen and (max-width: 600px) {
      height: 1150px;
    }
  }

  @media screen and (max-width: 1060px) {
    padding: 50px;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
