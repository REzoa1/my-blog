import React from "react";
import { Footer } from "./../../pages/Posts/Footer/Footer";
import { Header } from "./../../pages/Posts/Header/Header";
import { Posts } from "./../../pages/Posts/Posts";
import { Redirect, Route } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "./../../pages/Posts/SideBar/Sidebar";
import { Form } from "./../../pages/Posts/Form/Form";
import { PostPage } from "../../pages/PostPage/PostPage";
import { Account } from "../../pages/Account/Account";
import { useAccountState } from "../../utils/hooks";

export const MainBlock = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { userState, setUserState } = useAccountState();
  return (
    <>
      <SideBar
        setIsFormOpen={setIsFormOpen}
        avatar={userState.avatar}
        userName={userState.userName}
      />
      <main>
        {isFormOpen && <Form setIsFormOpen={setIsFormOpen} />}
        <Header />
        <Route exact path="/blog">
          <Posts title="Посты" />
        </Route>
        <Route exact path="/blog/:postId">
          <PostPage />
        </Route>
        <Route exact path="/favourite">
          <Posts title="Избранное" isFavourite={true} />
        </Route>
        <Route exact path="/account">
          <Account userState={userState} setUserState={setUserState} />
        </Route>

        <Route exact path="/">
          <Redirect to="/blog" />
        </Route>
        <Footer />
      </main>
    </>
  );
};
