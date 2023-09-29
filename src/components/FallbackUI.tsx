import React from "react";
import Logo from "../assets/logo_black.svg";
import styled from "styled-components";

export default function FallbackUI() {
  return (
    <Contain>
      <img src={Logo} alt="Goodi" />
    </Contain>
  );
}

const Contain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
