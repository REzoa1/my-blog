import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { NoMatch } from "../../pages/NoMatch/NoMatch";
import { selectIsLoggedIn } from "../../store/slices/auth";
import { selectPostsData } from "../../store/slices/posts";
import { APP_ROUTES } from "../../utils/constants";

export const PrivateRoute = ({ path, exact = false, children: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { postsList } = useSelector(selectPostsData);
  
  const blogRoutes = postsList.map((post) => {
    return `/blog/${post.id}`;
  });
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        const allRoutes = [...APP_ROUTES, ...blogRoutes];
        const isPathExists = allRoutes.some(
          (route) => route === location.pathname
        );
        if (!isPathExists) return <NoMatch />;
        if (isLoggedIn) return Component;
        return <Redirect to="/login" />;
      }}
    />
  );
};
