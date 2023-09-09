import React, { useState } from "react";
import styled from "styled-components";
import { likeAPI, cancelLikeAPI } from "../../../api";

import nonLikeIcon from "../../../assets/empty_likeBtn.svg";
import likeIcon from "../../../assets/post_fullLikeBtn.svg";

// TODO: 기능 수정 필요
function ButtonPostLike({ postId, liked, setHeartValue }) {
  const initialHearted = localStorage.getItem(`hearted_${postId}`) === "true";
  const [IsLiked, setIsLiked] = useState(liked);
  const [hearted, sethearted] = useState(initialHearted);

  const getHeartData = () => {
    setHeartValue((prev) => (prev += 1));
  };
  const cancleHeartData = () => {
    setHeartValue((prev) => (prev -= 1));
  };

  const handleLike = async () => {
    if (IsLiked) {
      // 이미 하트를 누른 경우, 좋아요 취소
      const response = await cancelLikeAPI(postId);
      if (response) {
        setIsLiked(false);
        sethearted(response.post.hearted);
        cancleHeartData();
        localStorage.removeItem(`hearted_${postId}`);
      }
    } else {
      // 하트를 누르지 않은 경우, 좋아요
      const response = await likeAPI(postId);
      if (response) {
        setIsLiked(true);
        sethearted(response.post.hearted);
        localStorage.setItem(`hearted_${postId}`, response.post.hearted);
        getHeartData();
      }
    }
  };

  return <Button liked={IsLiked} onClick={handleLike} />;
}
export default ButtonPostLike;

const Button = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  background: ${(props) => (props.liked ? `url(${likeIcon})` : `url(${nonLikeIcon})`)};
`;
