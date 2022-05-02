import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Switch } from "react-router-dom";
import { useFetchPosts } from "./utils/hooks";
import { MainBlock } from "./components/MainBlock/MainBlock";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { POSTS_URL } from "./utils/constants";

function App() {
  // document.title = "My Blog";
  const postsData = useFetchPosts(POSTS_URL);
  const blogPostRoutes = postsData.postsList.map((post) => {
    return `/blog/${post.id}`;
  });
  return (
    <Switch>
      <PublicRoute exact path="/login" blogPostRoutes={blogPostRoutes}>
        <LoginPage />
      </PublicRoute>
      <PrivateRoute path="/" blogPostRoutes={blogPostRoutes}>
        <MainBlock />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
