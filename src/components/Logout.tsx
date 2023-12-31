import { useNavigate } from "react-router-dom";
import { removeLoginCookie } from "../utils";

export default function LogoutHandler() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLoginCookie({ path: "/" });

    navigate("/login");
  };

  return { handleLogout };
}
