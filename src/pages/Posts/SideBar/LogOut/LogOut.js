// import "./LogOut.css";
import exit from "./../../../../assets/img/svg/exit.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logOut } from "../../../../store/slices/auth";
import { useDispatch } from "react-redux";
// import { AppProvider, useLogin } from "../../../AppProvider";

export const LogOut = () => {
  
  
  
  const history = useHistory();
  const dispatch = useDispatch();
  // const { logOut } = useLogin();
  const handleExit = () => {
    // localStorage.removeItem("isLoggedIn");
    // setIsLoggedIn(false);
    dispatch(logOut());
    history.push("/login");
  };
  return (
    <a className="link" onClick={handleExit}>
      <img className="link__icons" src={exit} alt="log out" />
      Выход
      {/* <AppProvider history={history} /> */}
    </a>
  );
};
