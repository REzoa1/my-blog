// import "./LogOut.css";
import exit from "./../../../assets/img/svg/exit.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AppProvider, useLogin } from "../../../AppProvider";

export const LogOut = () => {
  
  // const history = useHistory();
  const { logOut } = useLogin();
  // const logOut = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  //   history.push("/login");
  // };
  return (
    <a className="link" onClick={logOut}>
      <img className="link__icons" src={exit} alt="log out" />
      Выход
      {/* <AppProvider history={history} /> */}
    </a>
  );
};
