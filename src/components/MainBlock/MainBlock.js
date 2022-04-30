import React, { useReducer } from "react";
// import { Favourite } from "../pages/Favourite/Favourite";
import { Footer } from "./../../pages/Posts/Footer/Footer";
import { Header } from "./../../pages/Posts/Header/Header";
import { Posts } from "./../../pages/Posts/Posts";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { SideBar } from "./../../pages/Posts/SideBar/Sidebar";
import { Form } from "./../../pages/Posts/Form/Form";
import { NoMatch } from "../../pages/NoMatch/NoMatch";
// import { useFetchPosts } from "../../utils/hooks";
import { POSTS_URL } from "../../utils/constants";
import { PostPage } from "../../pages/PostPage/PostPage";
import { useSelector } from "react-redux";
import { selectPostsData, setIsLoading, setPostsList } from "../../store/slices/posts";
import { Account } from "../../pages/Account/Account";
import initialImg from "./../../assets/img/avatar.png";
import noAvatar from "./../../assets/img/avatar.png"


export const MainBlock = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { postsList, isLoading, error } = useSelector(selectPostsData);
  // const { postsList, setPostsList } = useFetchPosts(POSTS_URL);
  
  // console.log(isLoading);
  // const { postsList, setPostsList } = useFetchPosts(POSTS_URL);
  const [avatar, setAvatar] = useState(initialImg);
  // const [userName, setUserName] = useState(localStorage.getItem("LoginValue"));

  const [userState, setUserState] = useReducer(
    (userState, newPost) => ({ ...userState, ...newPost }),
    {
      avatar: localStorage.getItem("avatar") || noAvatar,
      userName: localStorage.getItem("LoginValue"),
      age: localStorage.getItem("age") || 1,
    }
  );
  
  // const { userState } = useFetchPosts();
  // console.log(userState);
  // const likedPosts = postsList.filter((post) => post.liked);
  return (
    <>
      <SideBar setIsFormOpen={setIsFormOpen} avatar={userState.avatar} userName={userState.userName} />
      <main>
        {isFormOpen && (
          <Form
            setIsFormOpen={setIsFormOpen}
            postsList={postsList}
            setPostsList={setPostsList}
          />
        )}
        <Header />
        <Route exact path="/blog">
          <Posts
            title="Посты"
            // postsList={postsList}
            // setPostsList={setPostsList}
          />
        </Route>
        <Route exact path="/blog/:postId">
          <PostPage />
        </Route>
        <Route exact path="/favourite">
          <Posts
            title="Избранное"
            // postsList={postsList}
            // setPostsList={setPostsList}
            isFavourite={true}
          />
        </Route>
        <Route exact path="/account">
          <Account userState={userState} setUserState={setUserState}/>
        </Route>

        <Route exact path="/">
          <Redirect to="/blog" />
        </Route>

        <Footer />
      </main>
    </>
  );
};
