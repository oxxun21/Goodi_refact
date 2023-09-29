import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { postListAPI } from "../../api";

import ProfileUI from "../ProfileUI";
import NoPostsUI from "../NoPostsUI";

import { BASE_URL } from "../../utils";
import PopularAuthorViewPost from "./PopularAuthorViewPost";
import { postList_I } from "../../interface/post_I";

export default function PopularAuthorview({ account }: { account: string }) {
  const [userPostList, setUserPostList] = useState<postList_I[] | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await postListAPI(account);

      if (response.post) {
        setUserPostList(response.post);
      }
    };

    fetchPostData();
  }, []);

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
                    <PopularAuthorViewPost post={post} />
                  </li>
                ))}
            </Post>
          </PostListWrap>
        </>
      )}
    </>
  );
}

const PostListWrap = styled.section<{ hasPosts: boolean }>`
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
