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
import { useLogin } from "./AppProvider";
import { PostPage } from "./pages/PostPage/PostPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { POSTS_URL } from "./utils/constants";
// import { Test } from "./components/Test/Test";

function App() {
  const { isLoggedIn } = useLogin();
  document.title = "My Blog";
  // useEffect(() => {
  //   document.title = "My Blogdd";
  // }, [document.title]);

  // const lol =  "" + useDocumen()
  // console.log(typeof lol);

  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   // false
  //   localStorage.getItem("isLoggedIn") === "true"
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

  // useEffect(() => {
  //   const handleKayUp = () => {
  //     console.log("Клавиша нажата!");
  //   };

  //   window.addEventListener("keyup", handleKayUp);
  //   return () => {
  //     window.removeEventListener("keyup", handleKayUp);
  //   };
  // }, []);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchUsers = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/users"
  //     );
  //     const response = await fetch(POSTS_URL + 1)
  //      .then(async(res) => {
  //       console.log(await res.json());
  //      })
  //     const json = await response.json();
  //     setUsers(json);

  //     setIsLoading(false);
  //   };
  //   fetchUsers();
  // console.log(json);

  // return ()
  // .then(response => response.json())
  // .then(json => console.log(json))

  // fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(async (res) => {
  //     console.log(await res.json());
  //   })
  // .catch((err) => {
  //   console.log(err);
  // })
  // }, []);
  // const isVisible = false;

  // if (isLoading) return <h1>Загрузка...</h1>

  
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
    return `/blog/${post.id}`
  })
  // console.log(blogPostRoutes);

  return (
    <BrowserRouter>
      <>
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

          <PublicRoute exact path="/login" isLoggedIn={isLoggedIn} blogPostRoutes={blogPostRoutes}>
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path="/" isLoggedIn={isLoggedIn} blogPostRoutes={blogPostRoutes}>
            <MainBlock />
          </PrivateRoute>

          {/* <Route path="/">
            {isLoggedIn ? <MainBlock /> : <Redirect to="/login" />}
          </Route> */}

          {/* <Route exact path="*">
              <NoMatch />
            </Route> */}
        </Switch>
        {/* </main> */}
      </>
    </BrowserRouter>
  );
}

export default App;
