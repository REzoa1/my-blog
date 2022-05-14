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
    <form className="page_404" onSubmit={handleSubmit}>
      <div className="four_zero_four_bg">
        <h3>404</h3>
      </div>
      <div className="contant_box_404">
        <h3>
          Cтраница <b>{pathname.slice(1)}</b> не найдена
        </h3>
        <button className="link_404" href="" type="submit">
          Назад
        </button>
      </div>
    </form>
  );
};
