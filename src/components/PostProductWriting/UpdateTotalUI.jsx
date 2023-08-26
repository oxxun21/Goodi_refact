import React, { useEffect, useState } from "react";
import * as T from "./writingUI.styled";
import { useLocation, useParams } from "react-router";
import imageCompression from "browser-image-compression";

import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

import { handlePostUpdateForm } from "../../utils";

export default function UpdateTotalUI(props) {
  const { src, subtext, data, setData, send, description, imageWrap, setImageWrap } = props;

  const location = useLocation();
  const locationID = useParams();
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const { name } = e.target;

    // 이미지 업로드 안되는 상태
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 490,
        useWebWorker: true,
      };

      setLoading(true);
      const resizingBlob = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(resizingBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        handlePostUpdateForm(base64data, name, setImageWrap, setLoading);
      };
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <T.PostingWrap>
      <T.PostUiWrap>
        <h2 className="a11y-hidden">수정 페이지</h2>
        <img src={src} alt={src} />
        <p>{subtext}</p>

        <T.UploadWrap onSubmit={send}>
          <ImageSection handleInputChange={handleInputChange} loading={loading} imageWrap={imageWrap} />

          <T.Line />

          {location.pathname === `/post/${locationID.posting_id}` && <PostWriting handleInputChange={handleInputChange} description={description} />}

          {location.pathname === `/product/${locationID.product_id}` && <ProductWriting data={data} handleInputChange={handleInputChange} description={description} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
