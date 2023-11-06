import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import Logo from "../assets/logo_black.svg";
import { checkImageUrl } from "../utils";
import { getFollowingQuery } from "../recoil/selector/getFollowingQuery";

import { Following_I } from "../interface";

function Header() {
  const [followingData, setFollowingData] = useState<Following_I[] | null>(null);
  const getFollowings = useRecoilValue(getFollowingQuery);

  const navigate = useNavigate();

  useEffect(() => {
    setFollowingData(getFollowings);
  }, []);

  return (
    <HeaderLayout>
      <h1>
        <LogoLink to="/">
          <img src={Logo} alt="goodi 로고 이미지" />
        </LogoLink>
      </h1>
      <FollowingWrap>
        {!followingData ? (
          <div></div>
        ) : (
          followingData
            .map((data) => {
              return (
                <FollowingIcon
                  key={data._id}
                  onClick={() => {
                    navigate(`/profile/${data.accountname}`);
                  }}
                  type="button"
                >
                  <img src={checkImageUrl(data.image, "profile")} alt="팔로우한 사람 프로필 이미지" />
                </FollowingIcon>
              );
            })
            .slice(0, 5)
        )}
        {followingData && followingData.length > 5 && <span>+ more</span>}
      </FollowingWrap>
    </HeaderLayout>
  );
}

export default React.memo(Header);

const HeaderLayout = styled.header`
  position: fixed;
  width: calc(100% - 80px);
  padding: 16px 60px 16px 80px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    padding: 1rem 2rem;
  }
  @media only screen and (max-width: 480px) {
    position: static;
    padding: 1rem;
  }
  h1 img {
    @media screen and (max-width: 480px) {
      width: 80%;
    }
  }
`;

const FollowingWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    cursor: default;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const LogoLink = styled(Link)`
  display: block;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 160px;
    height: 48px;
    vertical-align: middle;
  }
`;

const FollowingIcon = styled.button`
  transition: all 0.3s;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.3);
  }
`;
