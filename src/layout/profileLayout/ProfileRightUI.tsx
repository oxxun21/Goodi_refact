import React, { useState } from "react";
import styled from "styled-components";

// 컴포넌트
import ProductCardList from "../../components/Product/ProductCardList";
import PostCardList from "../../components/Post/PostCardList";

// 이미지
import pointEdgeProfile from "../../assets/point-edge-profile.svg";
import authorProducts from "../../assets/Author-Products.svg";
import authorPosts from "../../assets/Author-Posts.svg";

import { Accountname_I } from "../../interface";

function ProfileRightUI({ accountname }: Accountname_I) {
  // 상품 목록, 게시글 목록 탭
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <ProfileRight>
      {activeTab === 1 && (
        <h2>
          <img src={authorProducts} alt="사용자 상품 목록" />
        </h2>
      )}
      {activeTab === 2 && (
        <h2>
          <img src={authorPosts} alt="사용자 게시글 목록" />
        </h2>
      )}

      <TabMenu>
        <TabBtn className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>
          상품 목록
        </TabBtn>
        <TabBtn className={activeTab === 2 ? "active" : ""} onClick={() => handleTabClick(2)}>
          게시글 목록
        </TabBtn>
      </TabMenu>
      {activeTab === 1 && <ProductCardList profile={true} accountname={accountname ? String(accountname) : ""} />}
      {activeTab === 2 && <PostCardList accountname={accountname} />}
    </ProfileRight>
  );
}

export default React.memo(ProfileRightUI);

const ProfileRight = styled.section`
  & > h2 {
    position: relative;
    margin-left: 30px;
    margin-top: 168px;

    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: -35px;
      left: -34px;
      width: 95px;
      height: 40px;
      background: url(${pointEdgeProfile}) no-repeat center/contain;
      vertical-align: bottom;
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
    @media screen and (max-width: 1024px) {
      margin-top: 0;
    }
    @media screen and (max-width: 600px) {
      margin-left: 0;
    }
  }

  & > h2 > img {
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;

const TabMenu = styled.div`
  width: 220px;
  margin: 70px 0 30px;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  &:after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 70%;
    background-color: var(--gray300-color);
    position: absolute;
    top: 5px;
    left: 103px;
  }

  button.active {
    font-family: var(--font--semibold);
    color: black;
  }

  @media screen and (max-width: 1060px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 70px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 40px;
  }
`;
const TabBtn = styled.button`
  padding: 8px 12px;
  color: var(--gray500-color);
  cursor: pointer;
`;
