import React from "react";
import * as T from "./writingUI.styled";
import { useLocation, useParams } from "react-router";

import ImageSection from "./UIcomponents/ImageSection";
import PostWriting from "./UIcomponents/PostWriting";
import ProductWriting from "./UIcomponents/ProductWriting";

export default function UpdateTotalUI(props) {
  const { src, subtext, data, setData, send, description, imageWrap, setImageWrap } = props;

  const location = useLocation();
  const locationID = useParams();

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
          <ImageSection imageWrap={imageWrap} setImageWrap={setImageWrap} />

          <T.Line />

          {location.pathname === `/post/${locationID.posting_id}` && <PostWriting handleInputChange={handleInputChange} description={description} />}

          {location.pathname === `/product/${locationID.product_id}` && <ProductWriting data={data} handleInputChange={handleInputChange} description={description} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
