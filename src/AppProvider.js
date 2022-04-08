import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AppContext = createContext();
export const useLogin = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(!isLoggedIn);
    history.push("/login");
  };
  const logIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    history.push("/");
  };
  return (
    <AppContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
