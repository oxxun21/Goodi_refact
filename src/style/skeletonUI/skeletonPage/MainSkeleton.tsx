import React from "react";
import styled from "styled-components";
import SkeletonItem from "../SkeletonItem";
import PostSkeleton from "./PostSkeleton";

export default function MainSkeleton() {
  return (
    <>
      <SkeletonLogo />

      <MainWrap>
        <SkeletonMainLeft />

        <Line />

        <SkeletonMainRight>
          <MainRightTitle />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </SkeletonMainRight>
      </MainWrap>
    </>
  );
}

const MainWrap = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.1fr 1fr;
  grid-template-rows: auto;
  margin-bottom: 120px;
  @media only screen and (max-width: 992px) {
    grid-template-columns: auto;
    margin-bottom: 0;
  }
`;

const Line = styled.span`
  width: 1px;
  height: 100%;
  display: inline-block;
  background-color: var(--gray200-color);
  margin: 0 60px;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const SkeletonMainLeft = styled(SkeletonItem)`
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const SkeletonMainRight = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 60px 20px;
  padding-right: 60px;
  @media only screen and (max-width: 992px) {
    padding: 0 3rem;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MainRightTitle = styled(SkeletonItem)`
  width: 470px;
  height: 50px;
  grid-column: 1 / 3;
  @media only screen and (max-width: 600px) {
    width: 60%;
    grid-column: initial;
  }
`;

const SkeletonLogo = styled(SkeletonItem)`
  width: 160px;
  height: 48px;
  margin: 20px 60px;
  @media only screen and (max-width: 600px) {
    width: 30%;
    margin: 20px 3rem;
  }
`;
