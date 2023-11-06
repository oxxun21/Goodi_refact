import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cartNullIcon from "../../assets/profile_img_def.svg";
import commonBanner from "../../assets/common-banner.svg";

import { checkImageUrl } from "../../utils";

export default function MainLeft({ render }: { render: { img: string; id: string }[] }) {
  return (
    <MainLeftSection>
      <h2>
        <img src={commonBanner} alt="내가 팔로우한 작가님들 상품 지금 바로 구경하기" />
      </h2>

      <article>
        {render.length === 0 ? (
          <FollowingNull>
            <img src={cartNullIcon} alt="장바구니 아이콘" />
            <p>아직 팔로잉한 작가님이 없어요!</p>
          </FollowingNull>
        ) : (
          <>
            {render.filter((i) => i !== undefined).length > 0 ? (
              render
                .filter((item) => item !== undefined)
                .slice(0, 4)
                .map((item, index) => (
                  <Link key={item.id} to={`/productDetail/${item.id}`}>
                    <img src={checkImageUrl(item.img, "post")} alt={`팔로우한 작가 상품 이미지 ${index}`} />
                  </Link>
                ))
            ) : (
              <FollowingNull>
                <img src={cartNullIcon} alt="장바구니 아이콘" />
                <p>아직 작가님들이 상품을 올리지 않았어요!</p>
              </FollowingNull>
            )}
          </>
        )}
      </article>
    </MainLeftSection>
  );
}

const MainLeftSection = styled.section`
  article {
    position: relative;
    min-height: 90rem;
  }

  h2 {
    margin-bottom: 16px;
  }

  img {
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const FollowingNull = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 40rem;

  position: sticky;
  top: 5rem;

  & > img {
    width: 54px;
    margin-bottom: 18px;
  }

  & > p {
    font-family: var(--font--Regular);
    color: var(--gray400-color);
    margin-bottom: 32px;
  }
`;
