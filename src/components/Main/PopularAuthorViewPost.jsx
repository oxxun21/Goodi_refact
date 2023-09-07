import React, { useState } from "react";
import iconHeartWhite from "../../assets/icon_heart_line_white.svg";
import styled from "styled-components";

import { BASE_URL } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function PopularAuthorViewPost({ post }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <BottomImgDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigate(`/profile/${post.author?.accountname}`)}>
      <BottomImg src={BASE_URL + (post.image.split(",")[0] || "")} alt="게시글 사진" key={post.id} />

      {isHovered && (
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
  );
}

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
