import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {
  reduceTop?: boolean;
  children: ReactNode;
}

export default function Layout({ reduceTop, children }: LayoutProps) {
  return (
    <>
      <Header />
      <Navigation />
      <Wrapper reduceTop={reduceTop}>{children}</Wrapper>
      <Footer />
    </>
  );
}

const Wrapper = styled.div<{ reduceTop?: boolean }>`
  width: calc(100% - 80px);
  padding-top: ${({ reduceTop }) => (reduceTop ? "5rem" : "7.5rem")};
`;
