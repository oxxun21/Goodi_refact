import React, { useState } from "react";
import * as T from "./writingUI.styled";
import { useLocation, useParams } from "react-router";

import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

import { uploadImageAPI } from "../../api";

export default function UpdateTotalUI(props) {
  const { src, subtext, data, setData, send, description, imageWrap, setImageWrap } = props;

  const location = useLocation();
  const locationID = useParams();

  const handleImageChange = async (e) => {
    const { name } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const imgSrc = await uploadImageAPI(file);
      setImageWrap((prevArray) => {
        const newArray = [...prevArray];
        newArray[parseInt(name)] = imgSrc;
        return newArray;
      });
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <T.PostingWrap>
      <T.PostUiWrap>
        <h2 className="a11y-hidden">수정 페이지</h2>
        <img src={src} alt={src} />
        <p>{subtext}</p>

        <T.UploadWrap onSubmit={send}>
          <ImageSection handleInputChange={handleImageChange} imageWrap={imageWrap} />

          <T.Line />

          {location.pathname === `/post/${locationID.posting_id}` && <PostWriting handleInputChange={handleInputChange} description={description} />}

          {location.pathname === `/product/${locationID.product_id}` && <ProductWriting data={data} handleInputChange={handleInputChange} description={description} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
