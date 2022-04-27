import "./LoginPage.css";
import { useState } from "react";
import { useInput } from "../../utils/hooks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRightToBracket, faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
// import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

import { FormControl } from "./FormControl/FormControl";
import { useHistory} from "react-router-dom";
// import { useLogin } from "../../AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/slices/auth";

export const LoginPage = ({  }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  const loginProps = useInput("", true);
  const passwordProps = useInput("", true);

  // const { logIn } = useLogin();

  const dispatch = useDispatch();
  // const logIn = useSelector((state) => state.counter.value);

  // console.log(logIn);

  // const history = useHistory();
  
  // console.log(history);
  

  // const history = useHistory();
  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // const dispatch = useDispatch();
  // const logInn = (e) => {
  //   e.preventDefault();
  //   dispatch(logIn(e, history))
  // }
    // console.log(logIn(history));
    // console.log(history);
   


  // console.log(history);
  // console.log(history);
  const history = useHistory();
  // console.log(history);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      login: loginProps.formControlProps.value,
      password: passwordProps.formControlProps.value,
    };
    console.log(userData);
    // setIsLoggedIn(true);
    dispatch(logIn());
    history.push('/')
    // localStorage.setItem("isLoggedIn", true);
  };
  return (
    <div className="login_main">
      {/* <button onClick={() => dispatch(logIn())}>Btn</button>
      <div>{`${isLoggedIn}`}</div> */}
      {/* <div className="login_container"> */}
      <form onSubmit={handleSubmit} className="login_form"> 
      {/* onSubmit={logInn}  */}
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
