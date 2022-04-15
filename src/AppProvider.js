import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createHashHistory } from "history";
const AppContext = createContext();
export const useLogin = () => useContext(AppContext);

// export const blabla = () => console.log(111);

export const AppProvider = ({ children }) => {
  // console.log(history);
  // const historty = useHistory();
  const history = createHashHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    history.push("/login");
    setIsLoggedIn(!isLoggedIn);
  };
  const logIn = (e) => {
    e.preventDefault();
    history.push({ pathname: "/" });
    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", true);
  };
  return (
    <AppContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
