import React from "react";
// import { Favourite } from "../pages/Favourite/Favourite";
import { Footer } from "./../../pages/Posts/Footer/Footer"
import { Header } from "./../../pages/Posts/Header/Header";
import { Posts } from "./../../pages/Posts/Posts";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { SideBar } from "./../../pages/Posts/SideBar/Sidebar";
import { Form } from "./../../pages/Posts/Form/Form";
import { NoMatch } from "../../pages/NoMatch/NoMatch";
import { useFetchPosts } from "../../utils/hooks";
import { POSTS_URL } from "../../utils/constants";
import { PostPage } from "../../pages/PostPage/PostPage";

export const MainBlock = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { postsList, setPostsList } = useFetchPosts(POSTS_URL);

  // const { postsList, setPostsList } = useFetchPosts(POSTS_URL);

  // const likedPosts = postsList.filter((post) => post.liked);
  return (
    <>
      <SideBar
        setIsFormOpen={setIsFormOpen}
      />
      <main className="main__class">
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

        <Route exact path="/">
          <Redirect to="/blog" />
        </Route>


        <Footer />
      </main>
    </>
  );
};
