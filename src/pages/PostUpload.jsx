import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import UploadTotalUI from "../components/PostProductWriting/UploadTotalUI";

//이미지
import postUproad from "../assets/post_upload.svg";

// api
import { postUploadAPI } from "../api";

//recoil
import { loginToken, accountname } from "../recoil";

export default function PostUpload() {
  const navigate = useNavigate();

  const token = useRecoilValue(loginToken);
  const account_name = useRecoilValue(accountname);
  const myProfile = `/profile/${account_name}`;

  const [imageWrap, setImageWrap] = useState([]);
  const [userErrorMessage, setUserErrorMessage] = useState([]);

  // 게시글 입력 데이터
  const [postData, setPostData] = useState();
  const [data, setData] = useState({
    post: {
      content: "",
      image: "",
    },
  });

  const getPostData = (data) => {
    setPostData(data);
  };

  useEffect(() => {
    if (postData) {
      handlePost(postData, token);
    }
  }, [postData]);

  const handlePost = async (PostData, token) => {
    const response = await postUploadAPI(PostData, token);

    if (response && response.hasOwnProperty("post")) navigate(myProfile);
  };

  const handleError = () => {
    setData((prevState) => ({
      ...prevState,
      post: {
        ...prevState.post,
        image: imageWrap.join(),
      },
    }));

    const errors = [];
    if (data.post.image === "" && imageWrap.length === 0) {
      errors.push("이미지를 한개 이상 업로드 해주세요");
    }

    if (data.post.content === "" || !data.post.content) {
      errors.push("게시글을 입력해주세요");
    }
    setUserErrorMessage(errors);
  };

  return (
    <Layout reduceTop="true">
      <UploadTotalUI
        src={postUproad}
        subtext="당신의 게시글을 업로드 해보세요!"
        getData={getPostData}
        data={data}
        setData={setData}
        handleError={handleError}
        setImageWrap={setImageWrap}
        imageWrap={imageWrap}
        userErrorMessage={userErrorMessage}
      />
    </Layout>
  );
}
