import React, { useEffect } from "react";
import styled from "styled-components";

// 컴포넌트
import ProfileUI from "../ProfileUI";
import { ButtonFollow } from "../common";

// 이미지
import followers from "../../assets/Followers.svg";
import following from "../../assets/Following.svg";
import followSymbol from "../../assets/follow_symbol.svg";

// 이미지 검사
import { checkImageUrl } from "../../utils";
import { useParams } from "react-router";
import { follower_I, following_I } from "../../interface/follow_I";

interface FollowProps {
  followerData: follower_I[];
  followingData: following_I[];
  activeFollow: number;
}

export default function Follow({ followerData, followingData, activeFollow }: FollowProps) {
  const account_name = useParams();

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [activeFollow, account_name]);

  return (
    <FollowWrap>
      {activeFollow === 1 ? (
        <h3>
          <img src={followers} alt="팔로워" />
        </h3>
      ) : (
        <h3>
          <img src={following} alt="팔로잉" />
        </h3>
      )}

      {activeFollow === 1 && followerData && followerData?.length > 0 ? (
        <ul className="scroll-container">
          {followerData.map((follow) => (
            <FollowLi key={follow._id}>
              <ProfileUI user_profile={checkImageUrl(follow.image, "profile")} user_name={follow.username} user_email={follow.accountname} account_name={follow.accountname} follow={true} />
              <ButtonFollow isFollow={follow.isfollow} accountName={follow.accountname} />
            </FollowLi>
          ))}
        </ul>
      ) : activeFollow === 2 && followingData && followingData?.length > 0 ? (
        <ul className="scroll-container">
          {followingData.map((follow) => (
            <FollowLi key={follow._id}>
              <ProfileUI user_profile={checkImageUrl(follow.image, "profile")} user_name={follow.username} user_email={follow.accountname} account_name={follow.accountname} follow={true} />
              <ButtonFollow isFollow={follow.isfollow} accountName={follow.accountname} />
            </FollowLi>
          ))}
        </ul>
      ) : (
        <FollowNull>
          <img src={followSymbol} alt="구디 기본 이미지" />
          아직 유저가 존재하지 않습니다.
        </FollowNull>
      )}
    </FollowWrap>
  );
}

const FollowWrap = styled.article`
  width: 100%;

  h3 {
    height: 33px;
    margin-bottom: 20px;

    & > img {
      width: 50%;
    }
  }

  & > ul {
    max-height: 20rem;
    overflow-y: scroll;
    padding-right: 5px;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
`;

const FollowLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  & > a {
    width: 60%;
    margin-bottom: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FollowNull = styled.div`
  font-size: 16px;
  color: var(--gray400-color);
  text-align: center;

  img {
    width: 80px;
    display: block;
    margin: 0 auto 10px;
  }
`;
