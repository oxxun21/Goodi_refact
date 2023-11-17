import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import ProfileUI from "../ProfileUI";
import { LocalNav, Modal } from "../common";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountname, checkDeletePost } from "../../recoil";

import postMenu from "../../assets/post_menu.svg";
import { ProduceCard_I } from "../../interface";
import { productDeleteAPI } from "../../api";

export default function ProductCard({ profile, name, email, img, title, description, price, id }: ProduceCard_I) {
  const handleClick = useRef<any>(null);
  const myaccount_name = useRecoilValue(accountname);
  const temp = useParams();
  const account_name = temp.accountname ? temp.accountname : email || myaccount_name;
  const setCheckDelete = useSetRecoilState(checkDeletePost);

  const [isHidden, setIsHidden] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLocalNav = () => {
    setIsHidden((prevState) => !prevState);
  };

  const onClose = () => {
    setShowModal(!showModal);
  };

  const handleModalClick = async () => {
    const response = await productDeleteAPI(id);
    setCheckDelete((prev: boolean) => !prev);
    return response;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const localNavElement = document.getElementById("localNavElement");

      if (
        localNavElement &&
        !localNavElement.contains(e.target as Node) &&
        handleClick.current &&
        !handleClick.current.contains(e.target as Node)
      ) {
        setIsHidden(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <CardWrap>
      <CardTop>
        <ProfileUI user_profile={profile} user_name={name} card={true} account_name={account_name} id={id} />
        {temp.accountname === myaccount_name && (
          <button onClick={handleLocalNav}>
            <img src={postMenu} alt="메뉴 아이콘" ref={handleClick} />
          </button>
        )}
        <LocalNavWrap>
          {isHidden ? (
            <LocalNav
              handleModal={onClose}
              width="120px"
              lists={[
                { name: "상품 수정", nav: `/product/${id}` },
                { name: "상품 삭제", nav: "" },
              ]}
            />
          ) : (
            false
          )}
        </LocalNavWrap>
      </CardTop>
      <Link to={`/productDetail/${id}`}>
        <CardContent>
          <img alt="상품 이미지" src={img} />
          <h3>{title}</h3>
          <figcaption>{description}</figcaption>
          <strong>{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>
          <span>원</span>
        </CardContent>
      </Link>
      {showModal && (
        <Modal
          handleModalClick={handleModalClick}
          onClose={onClose}
          text="상품을 정말 삭제하시겠습니까?"
          buttonText1="상품을 삭제하겠습니다"
          buttonText2="아니요, 삭제하지 않습니다"
        />
      )}
    </CardWrap>
  );
}

const CardWrap = styled.section`
  position: relative;

  & > button {
    position: absolute;
    right: 16px;
    bottom: 172px;
  }
`;
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  & > button {
    height: 40px;
    cursor: pointer;
  }
  img {
    width: 40px;
    height: 40px;
  }
  strong {
    font-size: 16px;
  }
`;

const LocalNavWrap = styled.div`
  position: absolute;
  top: 43px;
  right: 0;
  z-index: 10;
`;

const CardContent = styled.figure`
  transition: all 0.3s;

  img {
    width: 100%;
    transition: all 0.3s;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    font-size: 20px;
    font-family: var(--font--semibold);
    padding: 16px 0;
    border-bottom: 1px solid var(--gray200-color);
  }

  figcaption {
    margin: 16px 0px;
    height: 3em;
    line-height: 1.5;
    color: var(--gray500-color);
    font-family: var(--font--Regular);
    font-size: 16px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  strong {
    font-size: 24px;
    font-family: var(--font--Bold);
    margin-right: 8px;
  }
`;
