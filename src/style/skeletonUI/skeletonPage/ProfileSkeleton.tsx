import React from "react";
import styled from "styled-components";
import PostSkeleton from "./PostSkeleton";
import SkeletonItem from "../SkeletonItem";

export default function ProfileSkeleton() {
  return (
    <>
      <ProfileLeft>
        <SkeletonProfileImage />
        <SkeletonUserName />
        <SkeletonId />
        <SkeletonOther />
      </ProfileLeft>
      <ProfileRight>
        <TabMenu />
        <ProfileRightGrid>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </ProfileRightGrid>
      </ProfileRight>
    </>
  );
}

// 왼쪽
const ProfileLeft = styled.section`
  width: 370px;
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
  @media screen and (max-width: 1060px) {
    padding: 50px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }
  @media only screen and (max-width: 480px) {
    padding: 30px;
  }
`;

const SkeletonProfileImage = styled(SkeletonItem)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 18px;
`;

const SkeletonUserName = styled(SkeletonItem)`
  width: 136px;
  height: 25px;
  margin: 0 auto 12px;
`;

const SkeletonId = styled(SkeletonItem)`
  width: 107px;
  height: 18px;
  margin: 0 auto 38px;
`;

const SkeletonOther = styled(SkeletonItem)`
  width: 100%;
  height: 200px;
`;

// 오른쪽
const ProfileRight = styled.section`
  margin-top: 220px;
  @media screen and (max-width: 1024px) {
    margin-top: 0;
  }
`;

const ProfileRightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 60px 30px;
  margin-bottom: 120px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TabMenu = styled(SkeletonItem)`
  width: 220px;
  height: 25px;
  margin: 70px 0 30px;
  position: relative;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
