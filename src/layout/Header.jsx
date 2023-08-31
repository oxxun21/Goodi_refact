import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { accountname } from "../recoil";
import { followingAPI } from "../api";
import Logo from "../assets/logo_black.svg";
import { checkImageUrl } from "../utils";

export default function Header() {
  const accountName = useRecoilValue(accountname);
  const [followingData, setFollowingData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowingData = async () => {
      const response = await followingAPI(accountName);
      setFollowingData(response.data);
    };
    fetchFollowingData();
  }, []);

  return (
    <HeaderLayout>
      <h1>
        <LogoLink to="/main">
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
        {followingData && <span>+{followingData.length - 5}</span>}
      </FollowingWrap>
    </HeaderLayout>
  );
}

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
`;

const FollowingWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    cursor: default;
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
