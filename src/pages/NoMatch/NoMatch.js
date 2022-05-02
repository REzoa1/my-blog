import "./NoMatch.css";
import React from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

export const NoMatch = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <form className="nomatch__form" onSubmit={handleSubmit}>
      <div className="nomatch__div">
        <h1>Error 404</h1>
        <h2> Cтраница <b>{pathname}</b> не найдена </h2>
        <div>
          <button className="nomatch__button"  type="submit" onClick={handleSubmit}>Назад</button>
        </div>
      </div>
    </form>
  );
};
