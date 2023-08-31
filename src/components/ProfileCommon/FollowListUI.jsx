import React, { useEffect, useState } from "react";
import styled from "styled-components";

// api
import { followingAPI, followerAPI } from "../../api";

// 컴포넌트
import Follow from "./Follow";

export default function FollowListUI({ profileData }) {
  const [activeFollow, setActiveFollow] = useState(1);

  const [followingData, setFollowingData] = useState([]);
  const [followerData, setFollowerData] = useState([]);

  const name = profileData.accountname;

  const handleFollowClick = (followNumber) => {
    setActiveFollow(followNumber);
  };
  const fetchFollowingData = async () => {
    const response = await followingAPI(name);
    setFollowingData([...response.data]);
  };

  const fetchFollowerData = async () => {
    const response = await followerAPI(name);
    setFollowerData([...response.data]);
  };

  useEffect(() => {
    fetchFollowingData();
    fetchFollowerData();
  }, [name]);

  return (
    <>
      <FollowWrap>
        <FollowDiv className={activeFollow === 1 && "followActive"} onClick={() => handleFollowClick(1)}>
          <strong>{profileData.followerCount}</strong>
          <p>팔로워</p>
        </FollowDiv>
        <FollowDiv className={activeFollow === 2 && "followActive"} onClick={() => handleFollowClick(2)}>
          <strong>{profileData.followingCount}</strong>
          <p>팔로잉</p>
        </FollowDiv>
      </FollowWrap>

      <Follow followerData={followerData} followingData={followingData} activeFollow={activeFollow} />
    </>
  );
}

const FollowWrap = styled.div`
  width: 100%;
  border-top: 1px solid var(--gray300-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 10px;
  margin-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 50%;
    width: 1px;
    height: calc(100% - 5px);
    display: inline-block;
    background-color: var(--gray200-color);
  }

  .followActive {
    background-color: #f4fff3;
    border-radius: 4px;

    strong {
      color: var(--dark-sub-color);
    }
  }
`;

const FollowDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  padding: 15px;
  cursor: pointer;

  strong {
    font-family: var(--font--semibold);
    font-size: 20px;
  }

  p {
    font-family: var(--font--Medium);
    font-size: 14px;
    color: var(--gray400-color);
    margin-top: 8px;
  }
`;
