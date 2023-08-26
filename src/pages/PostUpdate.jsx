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
import { loginToken, accountname } from "../recoil";

export default function PostUpdate() {
  const { posting_id } = useParams();
  const navigate = useNavigate();

  const account_name = useRecoilValue(accountname);

  const [imageWrap, setImageWrap] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await postGetUpdateAPI(posting_id);
      setData({
        id: response.post.id,
        content: response.post.content,
        image: response.post.image,
      });
      console.log(response);
      setImageWrap(response.post.image.split(","));
    };
    fetchPost();
  }, []);

  const postUpdateSend = async (e) => {
    e.preventDefault();
    const putData = {
      post: {
        id: data.id,
        content: data.content,
        image: data.image,
      },
    };

    await postPutAPI(posting_id, putData);

    navigate(`/profile/${account_name}`);
  };

  return (
    <Layout reduceTop="true">
      {data && (
        <UpdateTotalUI
          src={PostingUpload}
          subtext="게시물을 수정해주세요"
          description={data.content}
          send={postUpdateSend}
          setData={setData}
          data={data}
          imageWrap={imageWrap}
          setImageWrap={setImageWrap}
        />
      )}
    </Layout>
  );
}
