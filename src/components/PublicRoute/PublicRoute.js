import React from "react";
import { Route, Redirect } from "react-router-dom";
import { NoMatch } from "../../pages/NoMatch/NoMatch";
import { APP_ROUTES } from "../../utils/constants";

export const PublicRoute = ({
  isLoggedIn,
  path,
  exact = false,
  children: Component,
  blogPostRoutes,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        const allRoutes = [...APP_ROUTES, ...blogPostRoutes]
        const isPathExists = allRoutes.some(
          (route) => route === location.pathname
        );
        if (!isPathExists) return <NoMatch />;
        if (!isLoggedIn) return Component;
        return <Redirect to="/" />;
      }}
    />
  );
};
