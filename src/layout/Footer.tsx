import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FooterLogo from "../assets/logo_gray.svg";
import GithubBtn from "../assets/github_button.svg";

function Footer() {
  return (
    <FooterLayout>
      <FooterLogoImg src={FooterLogo} alt="footer 로고" />
      <p className="footer_text">
        <strong>상업적 목적이 없는 포트폴리오용 사이트입니다</strong>
        <br />
        - 오가은, 최나경, 노태희
        <br />
        Goodi. ©2023. All Rights Reserved.
      </p>
      <GithubButton to="https://github.com/FRONTENDSCHOOL5/final-10-Goodi" target="_blank">
        <img src={GithubBtn} alt="github 이동 버튼" />
      </GithubButton>
    </FooterLayout>
  );
}

export default Footer;

const FooterLayout = styled.footer`
  background-color: var(--gray100-color);
  width: calc(100% - 80px);
  padding: 30px 60px 30px 80px;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  color: var(--gray400-color);
  line-height: 1.5;

  .footer_text {
    width: 100%;
    margin-left: 80px;
  }

  .footer_text strong {
    font-size: 16px;
    font-weight: 600;
  }

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const FooterLogoImg = styled.img`
  width: 165px;
  height: 56px;
`;

const GithubButton = styled(Link)`
  img {
    width: 112px;
    height: 44px;
  }
`;
