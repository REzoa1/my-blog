import "./PostPage.css";
import noImage from "./../../assets/img/placeholder.png";
import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Description } from "../../components/Posts/Acticle/Description/Description";
import { POSTS_URL } from "../../utils/constants";
import { ReactComponent as HeartIcon } from "./../../assets/img/svg/heart-black.svg";
import { useGetSinglePost } from "../../utils/hooks";
import { EditForm } from "./EditForm/EditForm";

export const PostPage = () => {
  

  const { postId } = useParams();
  const { postList, setPostList, postState } = useGetSinglePost(
    POSTS_URL,
    postId
  );

  

  const { name, description, imgSrc, imgAlt, liked } = postList;

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);  
  const handleEditFormShow = () => setIsEditFormOpen(true);

  const history = useHistory();
  // console.log(postState.isLoading);

  

  // const [currentPost, setCurrentPost] = useState({});
  // useEffect(() => {
  //   fetch(POSTS_URL + postId)
  //     .then((res) => res.json())
  //     .then((res) => setCurrentPost(res))
  //     .catch(console.log);
  // }, []);
  if (postState.isLoading)
    return (
      <div className="container">
        <h1 className="preloader">
          <div className="loader"></div>
        </h1>
      </div>
    );
  if (postState.error) return <h1>{postState.error.message}</h1>;

  const like = () => {
    const updatedPost = { ...postList, liked: !postList.liked };

    fetch(POSTS_URL + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((updatedPostFromServer) => {
        // updatedPost[pos] = updatedPostFromServer;
        setPostList(updatedPostFromServer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = () => {
    const isDelete = window.confirm("Удалить пост?");
    if (isDelete) {
      fetch(POSTS_URL + postId, { method: "DELETE" })
        .then(() => history.goBack())
        .catch((error) => console.log(error));
      // if (response.ok) {
      //   const updatedPostsList = postList.filter((post) => post.id !== postId);
      //   setPostList(updatedPostsList);
      // } else {
      //   console.log(new Error(`${response.status} - ${response.statusText}`));
      // }
    }
  };

  const customFilling = liked ? "crimson" : "black";

  const edit = (
    <>
      <h1 className="selectedpost_title">{name}</h1>
      <p className="selectedpost__title">{description}</p>
      <div className="article_btns">
        <button className="btn" onClick={deletePost}>
          Удалить &nbsp;
        </button>
        <button className="btn" onClick={handleEditFormShow}>
          Редактировать &nbsp;
        </button>
      </div>
    </>
  );

  return (
    <div className="container">
      <article className="selectedpost_page">
        <div className="selectedpost_container">
          <Link to={`/blog`}>Назад</Link>
          <img
            src={imgSrc || noImage}
            className="selectedpost__img"
            alt={imgAlt}
          />
          <div className="like__btn" onClick={like}>
            <HeartIcon fill={customFilling} className="like" />
          </div>
        </div>

        <div className="selectedpost_main">
          {isEditFormOpen ? (
            <EditForm
              setIsEditFormOpen={setIsEditFormOpen}
              selectedPost={postList}
              setSelectedPost={setPostList}
            />
          ) : (
            edit
          )}
        </div>
      </article>
    </div>
  );
};
