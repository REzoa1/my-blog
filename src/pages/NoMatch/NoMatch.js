import React from "react";
import { useLocation } from "react-router";

export const NoMatch = () => {
  const { pathname } = useLocation();
  // console.log(location);
  return (
    <div className="container">
      Страница <b>{pathname}</b> не найдена
    </div>
  );
};
