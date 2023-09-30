import React from "react";
import * as T from "../writingUI.styled";

import { Textarea, Button } from "../../common";
import { PostWriting_I } from "../../../interface";

interface UpdatePostWritingProps {
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: PostWriting_I;
}

export default function UpdatePostWriting({ handleInputChange, data }: UpdatePostWritingProps) {
  return (
    <T.ContentUploadWrap>
      <T.InputWrap>
        <T.Label>게시글 내용</T.Label>
        <Textarea height="300px" placeholder="게시글 내용을 입력해주세요" value={data.content} onChange={handleInputChange} name="content" maxLength={100} required />
      </T.InputWrap>

      <Button type="submit" text={"게시글 업로드 하기"} br="4px" />
    </T.ContentUploadWrap>
  );
}
