import React from "react";
import * as T from "../writingUI.styled";

import { Input, Textarea, Button } from "../../common";
import { productWriting_I } from "../../../interface/product_I";

interface UpdateProductWritingProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: productWriting_I;
}

export default function UpdateProductWriting({ handleInputChange, data }: UpdateProductWritingProps) {
  return (
    <T.ContentUploadWrap>
      <T.InputWrap>
        <T.Label>상품명</T.Label>
        <Input name="itemName" placeholder="상품명을 입력해주세요" type="text" onChange={handleInputChange} value={data.itemName} required />
      </T.InputWrap>

      <T.InputWrap>
        <T.Label>상품가격</T.Label>
        <Input type="number" placeholder="상품가격을 입력해주세요" name="price" value={data.price} onChange={handleInputChange} required />
      </T.InputWrap>

      <T.InputWrap>
        <T.Label>상품 설명</T.Label>
        <Textarea width="100%" height="100px" placeholder="상품에 대한 설명을 입력해주세요" value={data.link} onChange={handleInputChange} name="link" required />
      </T.InputWrap>

      <Button type="submit" text={"상품 업로드 하기"} br="4px" />
    </T.ContentUploadWrap>
  );
}
