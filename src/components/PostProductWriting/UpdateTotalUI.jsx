import React from "react";
import * as T from "./writingUI.styled";
import { useLocation, useParams } from "react-router";

import ImageSection from "./UIcomponents/ImageSection";
import UpdatePostWriting from "./UIcomponents/UpdatePostWriting";
import UpdateProductWriting from "./UIcomponents/UpdateProductWriting";

export default function UpdateTotalUI(props) {
  const { src, subtext, data, setData, send, imageWrap, setImageWrap, errorMSG } = props;

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
        {errorMSG && <p>{errorMSG}</p>}

        <T.UploadWrap onSubmit={send}>
          <ImageSection imageWrap={imageWrap} setImageWrap={setImageWrap} />

          <T.Line />

          {location.pathname === `/post/${locationID.posting_id}` && <UpdatePostWriting handleInputChange={handleInputChange} data={data} />}

          {location.pathname === `/product/${locationID.product_id}` && <UpdateProductWriting data={data} handleInputChange={handleInputChange} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
