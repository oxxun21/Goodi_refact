import React, { useState } from "react";
import * as T from "../writingUI.styled";

import PlusIcon from "../../../assets/icon_plus_gray.svg";
import addIcon from "../../../assets/add_button_gray.svg";

import { BASE_URL } from "../../../utils";
import { handleImageCompression } from "../../../utils";
import imageCompression from "browser-image-compression";

interface ImageSectionProps {
  imageWrap: string[];
  setImageWrap: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageSection({ setImageWrap, imageWrap }: ImageSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.type === "file" && e.target.files && e.target.files.length > 0) {
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
        const base64data = reader.result as string;
        handleImageCompression(base64data, name, setImageWrap, setLoading);
      };
    }
  };

  return (
    <T.ImagUploadWrap>
      <T.ThumbnailWrap>
        <input id="thumbnail" type="file" name="0" style={{ display: "none" }} onChange={handleImageChange} />
        <T.Thumbnail htmlFor="thumbnail">
          {loading ? (
            <T.LoadingImage>
              <span className="circle1"></span>
              <span className="circle2"></span>
            </T.LoadingImage>
          ) : (
            <img src={imageWrap[0] ? BASE_URL + imageWrap[0] : PlusIcon} style={imageWrap[0] ? undefined : { width: "90px" }} alt="첫번째 이미지" />
          )}
        </T.Thumbnail>
      </T.ThumbnailWrap>

      <T.ProductImages>
        <input id="productImageOne" type="file" name="1" style={{ display: "none" }} onChange={handleImageChange} />
        <T.ProductImage htmlFor="productImageOne">
          {loading ? (
            <T.LoadingImage>
              <span className="circle1"></span>
              <span className="circle2"></span>
            </T.LoadingImage>
          ) : (
            <img src={imageWrap[1] ? BASE_URL + imageWrap[1] : addIcon} style={imageWrap[1] ? undefined : { width: "32px" }} alt="두번째 이미지" />
          )}
        </T.ProductImage>
        <T.ProductImage htmlFor="productImageTwo">
          {loading ? (
            <T.LoadingImage>
              <span className="circle1"></span>
              <span className="circle2"></span>
            </T.LoadingImage>
          ) : (
            <img src={imageWrap[2] ? BASE_URL + imageWrap[2] : addIcon} style={imageWrap[2] ? undefined : { width: "32px" }} alt="세번째 이미지" />
          )}
        </T.ProductImage>

        <input id="productImageTwo" type="file" name="2" style={{ display: "none" }} onChange={handleImageChange} />
      </T.ProductImages>
    </T.ImagUploadWrap>
  );
}
