import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Preloader.css";

export const Preloader = ({ isLoading, children }) => {
  if (isLoading)
    return (
      <div className="container">
        <h1 className="preloader"><div className="loader"></div></h1>
      </div>
    );
  return children;
};
