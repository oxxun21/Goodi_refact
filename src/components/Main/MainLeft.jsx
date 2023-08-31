import React, { useEffect, useState } from "react";
import styled from "styled-components";

import commonBanner from "../../assets/common-banner.svg";
import { useRecoilValue } from "recoil";
import { accountname } from "../../recoil";
import { followingAPI, productListAPI } from "../../api";
import { checkImageUrl } from "../../utils";
import { Link } from "react-router-dom";

export default function MainLeft() {
  const accountName = useRecoilValue(accountname);
  const [render, setRender] = useState([]);

  useEffect(() => {
    const fetchfollowProduct = async () => {
      const usernameResponse = await followingAPI(accountName);
      const renderProduct = usernameResponse.data.slice(0, 5);

      const imgPromises = renderProduct.map(async (item) => {
        const response = await productListAPI({ accountname: item.accountname });

        if (response.product) {
          const img = response.product[0].itemImage;
          const id = response.product[0].id;
          return { img, id };
        }
      });

      const imgIdResults = await Promise.all(imgPromises);

      setRender(imgIdResults);
    };
    fetchfollowProduct();
  }, []);

  return (
    <MainLeftSection>
      <h2>
        <img src={commonBanner} alt="내가 팔로우한 작가님들 상품 지금 바로 구경하기" />
      </h2>

      <article>
        {render.map((item, index) => (
          <Link key={item.id} to={`/productDetail/${item.id}`}>
            <img src={checkImageUrl(item.img, "post")} alt={`팔로우한 작가 상품 이미지 ${index}`} />
          </Link>
        ))}
      </article>
    </MainLeftSection>
  );
}

const MainLeftSection = styled.section`
  h2 {
    margin-bottom: 16px;
  }

  img {
    width: 100%;
  }
`;
