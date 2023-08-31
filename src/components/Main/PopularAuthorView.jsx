import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postListAPI } from "../../api";

import ProfileUI from "../ProfileUI";
import NoPostsUI from "../NoPostsUI";

import iconHeartWhite from "../../assets/icon_heart_line_white.svg";

import { BASE_URL } from "../../utils";

export default function PopularAuthorview({ account }) {
  const navigate = useNavigate();
  const [userPostList, setUserPostList] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await postListAPI({ accountname: account });

      if (response.post) {
        setUserPostList(response.post);
      }
    };

    fetchPostData();
  }, []);

  const handleMouseEnter = (postId) => {
    setUserPostList((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, isHovered: true } : post)));
  };

  const handleMouseLeave = () => {
    setUserPostList((prevPosts) => prevPosts.map((post) => ({ ...post, isHovered: false })));
  };

  return (
    <>
      {userPostList === null || userPostList.length === 0 ? (
        <NoPostsUI />
      ) : (
        <>
          {userPostList && userPostList.length > 0 && (
            <BottomWrap>
              <ProfileUI
                user_profile={BASE_URL + userPostList[0].author.image}
                user_name={userPostList[0].author.username}
                user_email={userPostList[0].author.accountname}
                mainprofile="false"
                card="true"
                account_name={account}
                style={{ margin: "20px" }}
              />
            </BottomWrap>
          )}
          <PostListWrap hasPosts={userPostList.length > 0}>
            <Post>
              {Array.from(userPostList)
                .reverse()
                .map((post) => (
                  <li key={post.id}>
                    <BottomImgDiv onMouseEnter={() => handleMouseEnter(post.id)} onMouseLeave={handleMouseLeave} onClick={() => navigate(`/profile/${post.author?.accountname}`)}>
                      <BottomImg src={BASE_URL + (post.image.split(",")[0] || "")} alt="" key={post.id} />
                      {/* 좋아요 개수와 게시글 내용을 보여주는 요소 */}
                      {post.isHovered && (
                        <>
                          <HoverContent>
                            <LikesCount>
                              <img src={iconHeartWhite} alt="좋아요 개수" />
                              {post.heartCount}
                            </LikesCount>
                            <PostContent>{post.content}</PostContent>
                          </HoverContent>
                        </>
                      )}
                    </BottomImgDiv>
                  </li>
                ))}
            </Post>
          </PostListWrap>
        </>
      )}
    </>
  );
}

const PostListWrap = styled.section`
  width: 100%;
  ${({ hasPosts }) =>
    hasPosts
      ? `
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
      gap: 60px 20px;
      margin-bottom: 70px;
    `
      : ""}
`;

const BottomWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Post = styled.ul`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  list-style: none;

  li:first-child {
    grid-row: 1 / span 2;
    grid-column: 1 / 2;
  }
`;
const BottomImgDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const BottomImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;

  visibility: visible;
  animation: setMotion 0.3s;

  @keyframes setMotion {
    0% {
      opacity: 0;
    }
    100% {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const LikesCount = styled.span`
  font-size: 16px;
  margin-bottom: 14px;

  img {
    width: 23px;
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const PostContent = styled.p`
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
  width: 90%;
`;
