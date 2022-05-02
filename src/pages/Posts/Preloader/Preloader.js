import "./Preloader.css";
import React from "react";

export const Preloader = ({ isLoading, children }) => {
  if (isLoading)
    return (
      <h1 className="preloader">
        <div className="loader"></div>
      </h1>
    );
  return children;
};
