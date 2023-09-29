import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Button } from "./common";

interface ModalProps {
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function InfoModal({ onClose }: ModalProps) {
  useEffect(() => {
    const root = document.body;
    root.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = root.style.top;
      root.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return createPortal(
    <ModalBgDark onClick={onClose}>
      <ModalBgWhite onClick={(e) => e.stopPropagation()}>
        <ModalInner>
          <span>작은 화면은 아직 구현이 안되어 있어요!</span>
          <div>
            <Button width="100%" onClick={onClose} text={"웹으로 볼께요"} />
          </div>
        </ModalInner>
      </ModalBgWhite>
    </ModalBgDark>,
    document.getElementById("modal")!
  );
}

const ModalBgDark = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const ModalBgWhite = styled.div`
  padding: 60px 30px 32px;
  background-color: white;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const ModalInner = styled.div`
  & span {
    display: block;
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
  }

  & > div > button {
    font-size: 14px;
    font-family: var(--font--semibold);
    border-radius: 4px;
  }
`;
