import React from "react";
import { Footer } from "./../../pages/Posts/Footer/Footer";
import { Header } from "./../../pages/Posts/Header/Header";
import { Posts } from "./../../pages/Posts/Posts";
import { Redirect, Route } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "./../../pages/Posts/SideBar/Sidebar";
import { AddForm } from "../../pages/Posts/AddForm/AddForm";
import { PostPage } from "../../pages/PostPage/PostPage";
import { Account } from "../../pages/Account/Account";
import { useAccountState } from "../../utils/hooks";
import { USER_URL } from "../../utils/constants";

export const MainBlock = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { userState, setUserState } = useAccountState(USER_URL);
  return (
    <>
      <SideBar setIsFormOpen={setIsFormOpen} userStateData={userState.data} />
      <main className="main__container">
        {isFormOpen && <AddForm setIsFormOpen={setIsFormOpen} />}
        <Header />
        <Route exact path="/blog">
          <Posts title="Посты" />
        </Route>
        <Route exact path="/blog/:postId">
          <PostPage />
        </Route>
        <Route exact path="/favourite">
          <Posts title="Избранное" isFavourite />
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
