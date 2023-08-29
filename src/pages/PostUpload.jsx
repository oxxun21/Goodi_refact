import React, { useState } from "react";
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
import { accountname } from "../recoil";

export default function PostUpload() {
  const navigate = useNavigate();
  const account_name = useRecoilValue(accountname);
  const myProfile = `/profile/${account_name}`;

  const [imageWrap, setImageWrap] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");
  const [data, setData] = useState({
    post: {
      content: "",
      image: "",
    },
  });

  const postSend = async (e) => {
    e.preventDefault();
    const response = await postUploadAPI({ content: data.post.content, image: data.post.image });

    if (response.status === 200) {
      navigate(myProfile);
    }
    if (response.status === 422) {
      setErrorMSG(response.data.message);
    }
  };

  return (
    <Layout reduceTop="true">
      <UploadTotalUI src={postUproad} subtext="당신의 게시글을 업로드 해보세요!" send={postSend} data={data} setData={setData} errorMSG={errorMSG} imageWrap={imageWrap} setImageWrap={setImageWrap} />
    </Layout>
  );
}
