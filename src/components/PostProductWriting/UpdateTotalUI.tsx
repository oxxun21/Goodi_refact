import React from "react";
import * as T from "./writingUI.styled";
import { useLocation, useParams } from "react-router";

import ImageSection from "./UIcomponents/ImageSection";
import UpdatePostWriting from "./UIcomponents/UpdatePostWriting";
import UpdateProductWriting from "./UIcomponents/UpdateProductWriting";
import { ProductWriting_I, PostWriting_I } from "../../interface";

interface UpdateTotalUIProps<T> {
  src: string;
  subtext: string;
  send: (e: React.FormEvent) => void;
  errorMSG?: string;
  imageWrap: string[];
  setImageWrap: React.Dispatch<React.SetStateAction<string[]>>;
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

export default function UpdateTotalUI<T>({ src, subtext, data, setData, send, imageWrap, setImageWrap, errorMSG }: UpdateTotalUIProps<T>) {
  const location = useLocation();
  const locationID = useParams();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(
      (prevData) =>
        ({
          ...(prevData as object),
          [name]: value,
        } as T)
    );
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

          {location.pathname === `/post/${locationID.posting_id}` && <UpdatePostWriting handleInputChange={handleInputChange} data={data as PostWriting_I} />}

          {location.pathname === `/product/${locationID.product_id}` && <UpdateProductWriting data={data as ProductWriting_I} handleInputChange={handleInputChange} />}
        </T.UploadWrap>
      </T.PostUiWrap>
    </T.PostingWrap>
  );
}
