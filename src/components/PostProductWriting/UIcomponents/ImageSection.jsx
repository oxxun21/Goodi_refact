import React from "react";
import * as T from "../writingUI.styled";

import PlusIcon from "../../../assets/icon_plus_gray.svg";
import addIcon from "../../../assets/add_button_gray.svg";

import { BASE_URL } from "../../../utils";
import { uploadImageAPI } from "../../../api";

export default function ImageSection({ setImageWrap, imageWrap }) {
  // TODO: 이미지 로딩 시 + 그림 깨지는거 확인하기
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

  return (
    <T.ImagUploadWrap>
      <T.ThumbnailWrap>
        <input id="thumbnail" type="file" name="0" style={{ display: "none" }} onChange={handleImageChange} />
        <T.Thumbnail htmlFor="thumbnail">
          <img src={imageWrap[0] ? BASE_URL + imageWrap[0] : PlusIcon} style={imageWrap[0] ? null : { width: "90px" }} alt="첫번째 이미지" />
        </T.Thumbnail>
      </T.ThumbnailWrap>

      <T.ProductImages>
        <input id="productImageOne" type="file" name="1" style={{ display: "none" }} onChange={handleImageChange} />
        <T.ProductImage htmlFor="productImageOne">
          <img src={imageWrap[1] ? BASE_URL + imageWrap[1] : addIcon} style={imageWrap[1] ? null : { width: "32px" }} alt="두번째 이미지" />
        </T.ProductImage>
        <T.ProductImage htmlFor="productImageTwo">
          <img src={imageWrap[2] ? BASE_URL + imageWrap[2] : addIcon} style={imageWrap[2] ? null : { width: "32px" }} alt="세번째 이미지" />
        </T.ProductImage>

        <input id="productImageTwo" type="file" name="2" style={{ display: "none" }} onChange={handleImageChange} />
      </T.ProductImages>
    </T.ImagUploadWrap>
  );
}
