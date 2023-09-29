import * as T from "../writingUI.styled";

import { Textarea, Button } from "../../common";

export default function PostWriting({ errorMSG }: { errorMSG: string }) {
  return (
    <T.ContentUploadWrap>
      <T.InputWrap>
        <T.Label>게시글 내용</T.Label>
        <Textarea width="100%" height="300px" placeholder="게시글 내용을 입력해주세요" name="content" maxLength={100} required />
      </T.InputWrap>

      <T.ErrorMassage>{errorMSG}</T.ErrorMassage>
      <Button type="submit" text={"게시글 업로드 하기"} br="4px" />
    </T.ContentUploadWrap>
  );
}
