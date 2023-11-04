import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import arrowPrimaryIcon from "../assets/icon_arrow_primary.svg";
import pointEdge from "../assets/point-edge.svg";
import popularProducts from "../assets/popular-products.svg";
import popularAuthor from "../assets/popular-author.svg";

import PopularAuthorView from "../components/Main/PopularAuthorView";
import Layout from "../layout/Layout";
import MainSkeleton from "../style/skeletonUI/skeletonPage/MainSkeleton";
import MainRightCard from "../components/Main/MainRightCard";
import MainLeft from "../components/Main/MainLeft";

import { useRecoilValue } from "recoil";
import { productListAPI } from "../api";
import { getFollowingQuery } from "../recoil/selector/getFollowingQuery";
import { FollowingSelector_I } from "../interface";

export default function Main() {
  const [loading, setLoading] = useState(true);

  const [render, setRender] = useState<{ img: string; id: string }[]>([]);

  const getFollowings = useRecoilValue(getFollowingQuery);

  useEffect(() => {
    const fetchfollowProduct = async () => {
      const imgPromises = getFollowings.map(async (item: FollowingSelector_I) => {
        const response = await productListAPI(item.accountname);

        if (response.product.length > 0) {
          const img = response.product[0].itemImage.split(",")[0];
          const id = response.product[0].id;
          return { img, id };
        }
      });
      const imgIdResults = await Promise.all(imgPromises);

      setLoading(false);
      setRender(imgIdResults);
    };
    fetchfollowProduct();
  }, [getFollowings]);

  return (
    <>
      {loading ? (
        <MainSkeleton />
      ) : (
        <Layout>
          <MainWrap>
            <MainLeft render={render} />

            <Line />

            <MainRight>
              <Title>
                <img src={popularProducts} alt="popular products" />
              </Title>
              <MainRightCard />
              <ProductLink to="/productUpload">나도 굿즈 판매하기</ProductLink>
            </MainRight>

            <MainBottom>
              <Title>
                <img src={popularAuthor} alt="Popular Author" />
              </Title>
              <PopularAuthorView account="popular1" />
              <PopularAuthorView account="popular2" />
            </MainBottom>
          </MainWrap>
        </Layout>
      )}
    </>
  );
}

const MainWrap = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 0.1fr 1fr;
  grid-template-rows: auto;

  @media screen and (max-width: 1060px) {
    grid-template-columns: 1fr 0.1fr 1fr;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
  }
`;

const MainRight = styled.section`
  padding-right: 60px;
  @media screen and (max-width: 992px) {
    padding-right: 0;
  }
`;

const MainBottom = styled.section`
  padding: 110px 60px 70px 80px;
  grid-row: 2 / 3;
  grid-column: 1 / 4;

  @media screen and (max-width: 1060px) {
    grid-template-columns: 1fr 0.1fr 1fr;
  }

  @media screen and (max-width: 992px) {
    padding: 110px 0 70px 0;
  }
`;

const Title = styled.h2`
  position: relative;
  margin-bottom: 30px;
  width: 30rem;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: -35px;
    left: -25px;
    width: 130px;
    height: 40px;
    background: url(${pointEdge}) no-repeat center/contain;
    vertical-align: bottom;
  }

  & img {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ProductLink = styled(Link)`
  width: 217px;
  height: 56px;
  padding: 12px 24px;
  margin: 0 auto;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  background-color: black;
  color: white;
  border-radius: 30px;

  font-size: 18px;
  font-family: var(--font--semibold);
  text-decoration: none;
  white-space: nowrap;

  &::after {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background: url(${arrowPrimaryIcon}) no-repeat center/cover;
  }
`;

const Line = styled.span`
  width: 1px;
  height: 100%;
  display: inline-block;
  background-color: var(--gray200-color);
  margin: 0 60px;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;
