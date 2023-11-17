import styled from "styled-components";
import Button from "./Button/Button";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  text: string;
  buttonText1: string;
  buttonText2: string;
  onClose: () => void;
  handleModalClick: () => void;
}

export default function Modal({ text, buttonText1, buttonText2, onClose, handleModalClick }: ModalProps) {
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
          <span>{text}</span>
          <div>
            <Button width="100%" text={buttonText1} onClick={handleModalClick} fontSize="14px" />
            <Button width="100%" bg="white" color="black" onClick={onClose} text={buttonText2} fontSize="14px" />
          </div>
        </ModalInner>
      </ModalBgWhite>
    </ModalBgDark>,
    document.getElementById("modal")!
  );
}

const ModalBgDark = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const ModalBgWhite = styled.div`
  min-width: 340px;
  background-color: white;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
const ModalInner = styled.div`
  max-width: 305px;
  margin: 0 auto;
  padding-bottom: 32px;
  padding-top: 60px;
  & span {
    display: block;
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
  }

  & > div > button:first-child {
    margin-bottom: 16px;
  }
`;
