import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useLogin = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(!isLoggedIn);
  };
    const logIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };
  return (
    <AppContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
