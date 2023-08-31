import { useNavigate } from "react-router-dom";
import { removeLoginCookie } from "../utils";

export default function LogoutHandler() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("recoil-persist");
    removeLoginCookie({ path: "/" });

    navigate("/");
  };

  return { handleLogout };
}
