import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { NoMatch } from "../../pages/NoMatch/NoMatch";
import { selectIsLoggedIn } from "../../store/slices/auth";
import { APP_ROUTES } from "../../utils/constants";

export const PublicRoute = ({
  path,
  exact = false,
  children: Component,
  blogPostRoutes,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const { posts } = useSelector(selectPostsData);
  // const blogPostRoutes = posts?.map((post) => {
  //   return `/blog/${post.id}`;
  // });
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
