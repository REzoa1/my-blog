// import logo from './logo.svg';
import "./App.css";
import { Header } from "./components/Header/Header";
import { Posts } from "./components/Posts/Posts";
import { Footer } from "./components/Footer/Footer";
import { SideBar } from "./components/SideBar/Sidebar";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Home } from "./pages/Home/Home";
// import { Favourite } from "./pages/Favourite/Favourite";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { useDocumentTitle, useFetchPosts } from "./utils/hooks";
import { Form } from "./components/Posts/Form/Form";
import { MainBlock } from "./components/MainBlock/MainBlock";
// import { useLogin } from "./AppProvider";
import { PostPage } from "./pages/PostPage/PostPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { POSTS_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./store/slices/auth";
import { fetchPosts, selectPosts } from "./store/slices/posts";
// import { Test } from "./components/Test/Test";

function App() {
  // const dispatch = useDispatch();
  // const posts = useSelector(selectPosts);
  // console.log(posts);

  

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  // const { isLoggedIn } = useLogin();
  document.title = "My Blog";
  // const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(log);
  // const dispatch = useDispatch();
  // const logIn = () => {login}
  // console.log(dispatch);
  // const [isLoggedIn, setIsLoggedIn] = useState(
  // false
  // localStorage.getItem("isLoggedIn") === "true"
  // );

  // const postExist = false;
  // if (!postExist) return (
  //   <h1>Постов нет</h1>
  // )

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   // console.log("Отрисовался");
  //   let timeInterval = setInterval(() => {
  //     setCount(count + 1);
  //   }, 500);
  //   return () => {
  //     clearInterval(timeInterval)
  //   }
  // }, [count]);

  // useEffect(() => {
  //   document.title = `Са ${count}`
  // }, [count]);

  /* {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <table border="1">
          {users.slice(0, 5).map((users) => {
            return (
              <thead>
                <tr>
                  <td>{users.id}</td>
                  <td>{users.name}</td>
                </tr>
              </thead>
            );
          })}
        </table>
      )}
      {isVisible && <Test />} */

  /* {isLoggedIn ? ( */
  const postsData = useFetchPosts(POSTS_URL);
  const blogPostRoutes = postsData.postsList.map((post) => {
    return `/blog/${post.id}`;
  });
  // console.log(blogPostRoutes);

  return (
    <Switch>
      {/* <Route exact path="/">
            {isLoggedIn ? <Redirect to="/blog" /> : <Redirect to="/login" />}
          </Route> */}

      {/* <Route
            exact
            path="/login"
            render={(props) => {
              if (isLoggedIn) return <Redirect to="/blog" />;
              return <LoginPage {...props} />;
            }}
          /> */}

      <PublicRoute exact path="/login" blogPostRoutes={blogPostRoutes}>
        <LoginPage />
      </PublicRoute>

      <PrivateRoute path="/" blogPostRoutes={blogPostRoutes}>
        <MainBlock />
      </PrivateRoute>

      {/* <Route path="/">
            {isLoggedIn ? <MainBlock /> : <Redirect to="/login" />}
          </Route> */}

      {/* <Route exact path="*">
              <NoMatch />
            </Route> */}
    </Switch>
  );
}

export default App;
