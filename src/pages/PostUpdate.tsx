import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

// component
import Layout from "../layout/Layout";
import UpdateTotalUI from "../components/PostProductWriting/UpdateTotalUI";

// image
import PostingUpload from "../assets/post_uproad.svg";

// API
import { postGetUpdateAPI, postPutAPI } from "../api";

// Recoil
import { accountname } from "../recoil";
import { postWriting_I } from "../interface/post_I";

export default function PostUpdate() {
  const { posting_id } = useParams();
  const navigate = useNavigate();

  const account_name = useRecoilValue(accountname);

  const [imageWrap, setImageWrap] = useState<string[]>([]);
  const [data, setData] = useState<postWriting_I | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await postGetUpdateAPI(posting_id);
      setData({
        id: response.post.id,
        content: response.post.content,
        image: response.post.image,
      });
      setImageWrap(response.post.image.split(","));
    };
    fetchPost();
  }, []);

  const postUpdateSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data) {
      const putData: postWriting_I = {
        id: data.id,
        content: data.content,
        image: imageWrap.join(","),
      };

      await postPutAPI(posting_id, putData);

      navigate(`/profile/${account_name}`);
    }
  };

  return (
    <Layout reduceTop={true}>
      {data && <UpdateTotalUI src={PostingUpload} subtext="게시물을 수정해주세요" send={postUpdateSend} setData={setData} data={data} imageWrap={imageWrap} setImageWrap={setImageWrap} />}
    </Layout>
  );
}
