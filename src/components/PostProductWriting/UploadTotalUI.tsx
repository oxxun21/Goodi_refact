import React from "react";
import * as T from "./writingUI.styled";
import { useLocation } from "react-router";

// 컴포넌트
import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

interface UploadTotalUIProps {
  src: string;
  subtext: string;
  send: (e: React.FormEvent) => void;
  errorMSG: string;
  imageWrap: string[];
  setImageWrap: React.Dispatch<React.SetStateAction<string[]>>;
  formRef: React.RefObject<HTMLFormElement>;
}

export default function UploadTotalUI({ src, subtext, send, errorMSG, imageWrap, setImageWrap, formRef }: UploadTotalUIProps) {
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
