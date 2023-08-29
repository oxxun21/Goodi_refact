import React, { useState } from "react";
import * as T from "./writingUI.styled";
import imageCompression from "browser-image-compression";
import { useLocation } from "react-router";

// 컴포넌트
import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

export default function UploadTotalUI(props) {
  const { src, subtext, send, data, setData, errorMSG, imageWrap, setImageWrap } = props;

  const location = useLocation();

  const [description, setDescription] = useState("");

  // 글자수 카운트
  const handleTextCount = (e) => {
    const textSlice = e.target.value;
    setDescription(textSlice.slice(0, 100));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setDescription(value);

    if (location.pathname === "/postUpload") {
      setData((prevState) => ({
        ...prevState,
        post: {
          ...prevState.post,
          image: imageWrap.join(","),
          [name]: value,
        },
      }));
    }

    if (location.pathname === "/productUpload") {
      setData((prevState) => ({
        ...prevState,
        product: {
          ...prevState.product,
          itemImage: imageWrap.join(","),
          [name]: name === "price" ? parseInt(value) : value,
        },
      }));
    }

    if (name === "content" || name === "link") {
      handleTextCount(e);
    }
  };

  return (
    <T.PostingWrap>
      <T.PostUiWrap>
        <h2 className="a11y-hidden">업로드 페이지</h2>
        <img src={src} alt={src} />
        <p>{subtext}</p>

        <T.UploadWrap onSubmit={send}>
          <ImageSection imageWrap={imageWrap} setImageWrap={setImageWrap} />

          <T.Line />

          {location.pathname === "/postUpload" && <PostWriting handleInputChange={handleInputChange} description={description} errorMSG={errorMSG} />}

          {location.pathname === "/productUpload" && <ProductWriting data={data} handleInputChange={handleInputChange} errorMSG={errorMSG} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
