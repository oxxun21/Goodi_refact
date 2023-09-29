import React from "react";
import * as T from "../writingUI.styled";

import { Textarea, Button } from "../../common";
import { postWriting_I } from "../../../interface/post_I";

interface UpdatePostWritingProps {
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: postWriting_I;
}

export default function UpdatePostWriting({ handleInputChange, data }: UpdatePostWritingProps) {
  return (
    <T.ContentUploadWrap>
      <T.InputWrap>
        <T.Label>게시글 내용</T.Label>
        <Textarea width="100%" height="300px" placeholder="게시글 내용을 입력해주세요" value={data.content} onChange={handleInputChange} name="content" maxLength={100} required />
      </T.InputWrap>

      <Button type="submit" text={"게시글 업로드 하기"} br="4px" />
    </T.ContentUploadWrap>
  );
}
