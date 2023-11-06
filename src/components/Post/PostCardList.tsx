import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 리코일
import { useRecoilValue } from "recoil";
import { checkDeletePost } from "../../recoil";

// api
import { postListAPI } from "../../api";

// 컴포넌트
import PostCard from "./PostCard";
import NoPostsUI from "../NoPostsUI";

// 이미지 검사
import { checkImageUrl } from "../../utils";

import { Accountname_I, PostList_I } from "../../interface";

export default function PostCardList({ accountname }: Accountname_I) {
  const [userPostList, setUserPostList] = useState<PostList_I[] | null>(null);
  const checkDelete = useRecoilValue(checkDeletePost);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await postListAPI(accountname as string);

        if (response.post) {
          setUserPostList(response.post);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostData();
  }, [accountname, checkDelete]);

  return (
    <>
      {userPostList === null || userPostList.length === 0 ? (
        <NoPostsUI />
      ) : (
        <PostListWrap>
          {userPostList.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              username={post.author.username}
              profileImage={post.author.image}
              email={post.author.accountname}
              content={post.content}
              image={checkImageUrl(post.image.split(",")[0], "post")}
              createdAt={post.createdAt}
              hearted={post.hearted}
              heartCount={post.heartCount}
            />
          ))}
        </PostListWrap>
      )}
    </>
  );
}

const PostListWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 60px 20px;
  margin-bottom: 70px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 40px 0;
  }
`;
