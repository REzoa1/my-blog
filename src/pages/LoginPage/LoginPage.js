import "./LoginPage.css";
import { useState } from "react";
import { useInput } from "../../utils/hooks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRightToBracket, faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
// import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

import { FormControl } from "./FormControl/FormControl";
import { useHistory} from "react-router-dom";
import { useLogin } from "../../AppProvider";

export const LoginPage = ({ setIsLoggedIn }) => {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const loginProps = useInput("", true);
  const passwordProps = useInput("", true);

  // const history = useHistory();
  
  // console.log(history);
  const { logIn } = useLogin();
  // console.log(history);
  // console.log(history);
  // const history = useHistory();
  // console.log(history);
  // const logIn = (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     login: loginProps.formControlProps.value,
  //     password: passwordProps.formControlProps.value,
  //   };
  //   console.log(userData);
  //   setIsLoggedIn(true);
  //   history.push('/')
  //   localStorage.setItem("isLoggedIn", true);
  // };
  return (
    <div className="login_main">
      {/* <div className="login_container"> */}
      <form onSubmit={logIn} className="login_form">
        <h1 className="login_content login_text">Вход</h1>
        <FormControl
          className="input_form login_input"
          placeholder="Логин"
          inputProps={loginProps}
          icon={faUser}
        />
        <FormControl
          className="input_form"
          type={passwordShown ? "text" : "password"}
          placeholder="Пароль"
          inputProps={passwordProps}
          icon={faLock}
          icon_eye={passwordShown ? faEye : faEyeSlash}
          onClick={togglePassword}
        />
        <button className="button-form" type="submit">
          Войти
          {/* &nbsp; */}
          {/* <FontAwesomeIcon icon={faRightToBracket} /> */}
        </button>
      </form>
      {/* <AppProvider history={history} /> */}
      {/* </div> */}
    </div>
  );
};
