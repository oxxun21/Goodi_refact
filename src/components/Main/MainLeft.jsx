import React from "react";
import styled from "styled-components";

import commonBanner from "../../assets/common-banner.svg";
import { checkImageUrl } from "../../utils";
import { Link } from "react-router-dom";

export default function MainLeft({ render }) {
  return (
    <MainLeftSection>
      <h2>
        <img src={commonBanner} alt="내가 팔로우한 작가님들 상품 지금 바로 구경하기" />
      </h2>

      <article>
        {render
          .filter((i) => i !== undefined)
          .map((item, index) => (
            <Link key={item.id} to={`/productDetail/${item.id}`}>
              <img src={checkImageUrl(item.img, "post")} alt={`팔로우한 작가 상품 이미지 ${index}`} />
            </Link>
          ))
          .slice(0, 4)}
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
