import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

// 컴포넌트
import SearchInput from "./SearchInput";
import SearchHistory from "./SearchHistory";
import SearchResult from "./SearchResult";

// Skeleton
import SearchSkeleton from "../../style/skeletonUI/skeletonPage/SearchSkeleton";

// API
import { searchAPI } from "../../api";

// Recoil
import { recentSearch } from "../../recoil";

import { Search_I } from "../../interface";

interface SearchProps {
  handleSearch: () => void;
}

export default function Search({ handleSearch }: SearchProps) {
  const setIsRecentSearch = useSetRecoilState(recentSearch);
  const [searchResult, setSearchResult] = useState<Search_I[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // 검색결과 가져오기
  const fetchSearchAPI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formElements = formRef.current as HTMLFormElement;
    if (formRef.current) {
      const keywordInput = formElements.elements.namedItem("keywordInput") as HTMLInputElement;
      let keywordValue = keywordInput.value;
      const response = await searchAPI(keywordValue);

      setSearchResult(response.data);
      setIsRecentSearch((preveState: string[]) => [...preveState, keywordValue]);
      setIsLoading(false);
    }
  };

  // 이벤트 버블링 방지
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, []);

  // 스크롤 막는 함수
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // 스크롤 가능하게 하는 함수
  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <SearchbgDark onClick={handleSearch}>
      <SearchModal onClick={handleModalClick}>
        <h2>작가 검색</h2>
        <SearchInput formRef={formRef} handleClick={fetchSearchAPI} />
        <SearchHistory />
        {isLoading ? (
          <>
            <h3 className="skeleton_title">검색 결과</h3>
            <SearchSkeleton />
          </>
        ) : (
          <SearchResult searchResult={searchResult} />
        )}
      </SearchModal>
    </SearchbgDark>
  );
}

const SearchbgDark = styled.div`
  width: calc(100vw - 80px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  animation: dark ease 0.3s forwards;

  @keyframes dark {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const SearchModal = styled.article`
  width: 40%;
  height: 100vh;
  background-color: white;
  padding: 80px 60px;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  transform: translateX(1000px);
  animation: rotate ease 0.6s forwards;

  @keyframes rotate {
    from {
      transform: translateX(1000px);
    }
    to {
      transform: translateX(0);
    }
  }

  h2 {
    font-family: var(--font--Bold);
    font-size: 28px;
  }

  h3.skeleton_title {
    font-family: var(--font--Bold);
    font-size: 18px;
    margin-top: 72px;
  }

  @media only screen and (max-width: 1060px) {
    width: 50%;
    padding: 60px 40px;
  }
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
  @media only screen and (max-width: 480px) {
    width: 95%;
  }
`;
