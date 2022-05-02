import "./LoginPage.css";
import { useState } from "react";
import { useInput } from "../../utils/hooks";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl } from "./FormControl/FormControl";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/slices/auth";

export const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const loginProps = useInput(
    localStorage.getItem("LoginValue") || "",
    true,
    "login"
  );
  const passwordProps = useInput("", true, "password");
  
  // const { isWrong } = loginProps && passwordProps;
  const { isWrong: isWrongLogin } = loginProps;
  const { isWrong: isWrongPassword } = passwordProps;

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(loginProps.formControlProps.value));
    history.push("/");
  };

  return (
    <div className="login_main">
      <form onSubmit={handleSubmit} className="login_form">
        <h1 className="login_content login_text">Вход</h1>
        <FormControl
          className="input_form login_input"
          placeholder="Логин"
          inputProps={loginProps}
          icon={faUser}
          maxLength={8}
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
        <button
          disabled={isWrongLogin || isWrongPassword ? true : false}
          className="button-form"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};
