import React from "react";
import * as T from "./writingUI.styled";
import { useLocation } from "react-router";

// 컴포넌트
import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

export default function UploadTotalUI(props) {
  const { src, subtext, send, errorMSG, imageWrap, setImageWrap, formRef } = props;

  const location = useLocation();

  return (
    <T.PostingWrap>
      <T.PostUiWrap>
        <h2 className="a11y-hidden">업로드 페이지</h2>
        <img src={src} alt={src} />
        <p>{subtext}</p>

        <T.UploadWrap onSubmit={send} ref={formRef}>
          <ImageSection imageWrap={imageWrap} setImageWrap={setImageWrap} />

          <T.Line />

          {location.pathname === "/postUpload" && <PostWriting errorMSG={errorMSG} />}

          {location.pathname === "/productUpload" && <ProductWriting errorMSG={errorMSG} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
