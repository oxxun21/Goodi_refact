import React from "react";
import * as T from "../writingUI.styled";

import { Input, Textarea, Button } from "../../common";

export default function ProductWriting({ errorMSG }: { errorMSG: string }) {
  return (
    <T.ContentUploadWrap>
      <T.InputWrap>
        <T.Label>상품명</T.Label>
        <Input name="itemName" placeholder="상품명을 입력해주세요" type="text" required />
      </T.InputWrap>

      <T.InputWrap>
        <T.Label>상품가격</T.Label>
        <Input type="number" placeholder="상품가격을 입력해주세요" name="price" required />
      </T.InputWrap>

      <T.InputWrap>
        <T.Label>상품 설명</T.Label>
        <Textarea height="100px" placeholder="상품에 대한 설명을 입력해주세요" maxLength={100} name="link" required />
      </T.InputWrap>

      <T.ErrorMassage>{errorMSG}</T.ErrorMassage>
      <Button type="submit" text={"상품 업로드 하기"} br="4px" />
    </T.ContentUploadWrap>
  );
}
