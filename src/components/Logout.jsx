import { useRecoilState } from "recoil";
import { accountname, logoutCheck, loginToken, recentSearch, cartItemsState } from "../recoil";
import { useNavigate } from "react-router-dom";

export default function LogoutHandler() {
  const navigate = useNavigate();

  const [_loginToken, setToken] = useRecoilState(loginToken);
  const [_accountname, setAccountname] = useRecoilState(accountname);
  const [_logoutCheck, setLogoutCheck] = useRecoilState(logoutCheck);
  const [isRecentSearch, setIsRecentSearch] = useRecoilState(recentSearch);
  const [cartItemLogout, setCartItemLogout] = useRecoilState(cartItemsState);

  const handleLogout = () => {
    setToken(null);
    setAccountname("");
    setLogoutCheck(true);
    setIsRecentSearch([]);
    setCartItemLogout([]);

    navigate("/");
  };

  return { handleLogout };
}
