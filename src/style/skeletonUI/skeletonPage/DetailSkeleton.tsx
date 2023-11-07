import React from "react";
import styled from "styled-components";
import SkeletonItem from "../SkeletonItem";
import UserSkeleton from "./UserSkeleton";

export default function DetailSkeleton() {
  return (
    <DetailWrapSkeleton>
      <DetailImageSkeleton />
      <ProductDetailSkeleton>
        <ProductDetailSection>
          <UserSkeleton />
          <ProductTitle />
          <ProductDescrpition />
          <ProductDescrpitionOther />
        </ProductDetailSection>
      </ProductDetailSkeleton>
    </DetailWrapSkeleton>
  );
}

const DetailWrapSkeleton = styled.div`
  margin: 0 60px 120px 80px;
  display: flex;
  justify-content: space-between;
  gap: 5%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 480px) {
    margin: 0px 20px 120px;
  }
`;

const DetailImageSkeleton = styled(SkeletonItem)`
  width: 40%;
  height: 350px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 360px;
  }
`;

const ProductDetailSkeleton = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 100px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 3rem;
  }
`;

const ProductDetailSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 15px;
`;

const ProductTitle = styled(SkeletonItem)`
  width: 80%;
  height: 40px;
  margin-top: 15px;
`;

const ProductDescrpition = styled(SkeletonItem)`
  width: 100%;
  height: 55px;
`;

const ProductDescrpitionOther = styled(SkeletonItem)`
  width: 100%;
  height: 150px;
`;
