import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginCheck } from "../recoil";
import { useRecoilValue } from "recoil";

export default function ProtectRoute({ children }) {
  const isLogin = useRecoilValue(loginCheck);
  const navigate = useNavigate();
  const errorMessage = "로그인을 해주세요!";

  useEffect(() => {
    if (!isLogin) {
      navigate("/", { state: errorMessage });
    }
  }, []);

  return children;
}
