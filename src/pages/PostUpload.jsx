import React, { useRef, useState } from "react";
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

  const inputRef = useRef();

  const [imageWrap, setImageWrap] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");

  const handlePost = async (e) => {
    const { content } = inputRef.current.elements;
    e.preventDefault();

    const response = await postUploadAPI({ content: content.value, image: imageWrap.join(",") });

    if (response.status === 200) {
      navigate(`/profile/${account_name}`);
    }
    if (response.status === 422) {
      setErrorMSG(response.data.message);
    }
  };

  return (
    <Layout reduceTop="true">
      <UploadTotalUI src={postUproad} subtext="당신의 게시글을 업로드 해보세요!" send={handlePost} errorMSG={errorMSG} imageWrap={imageWrap} setImageWrap={setImageWrap} inputRef={inputRef} />
    </Layout>
  );
}
