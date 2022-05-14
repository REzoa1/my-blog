import "./PostPage.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import noImage from "./../../assets/img/placeholder.png";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { POSTS_URL } from "../../utils/constants";
import { ReactComponent as HeartIcon } from "./../../assets/img/svg/heart-black.svg";
import { useGetSinglePost } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/slices/posts";
import { EditForm } from "../../components/EditForm/EditForm";
import { deleteConfirmation } from "../../utils/helpers";
import { Preloader } from "../Posts/Preloader/Preloader";

export const PostPage = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { postList, setPostList, postState } = useGetSinglePost(
    POSTS_URL,
    postId
  );
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { name, description, imgSrc, imgAlt, liked } = postList;

  const handleEditFormShow = () => setIsEditFormOpen(true);
  const handleLikePost = () => {
    const updatedPost = { ...postList, liked: !postList.liked };
    dispatch(editPost(updatedPost)).finally(() => {
      setPostList(updatedPost);
    });
  };

  const postPage = true;
  const handleDeletePost = () => {
    deleteConfirmation(postId, dispatch, postPage, history);
  };

  const customFilling = liked ? "crimson" : "black";
  const edit = (
    <>
      <h1 className="selectedpost_title">{name}</h1>
      <p className="selectedpost__title">{description}</p>
      <div className="btn__group">
        <button className="btn" onClick={handleEditFormShow}>
          <EditOutlined />
        </button>
        <button className="btn" onClick={handleDeletePost}>
          <DeleteOutlined />
        </button>
      </div>
    </>
  );
  return (
    <div className="container">
      <Preloader isLoading={postState.isLoading}>
        <article className="selectedpost_page">
          <div className="selectedpost_container">
            <img
              src={imgSrc || noImage}
              className="selectedpost__img"
              alt={imgAlt}
            />

            <div className="like__btn" onClick={handleLikePost}>
              <HeartIcon fill={customFilling} className="like__icon" />
            </div>
          </div>
          <div className="selectedpost_main">
            {isEditFormOpen ? (
              <EditForm
                setIsEditFormOpen={setIsEditFormOpen}
                postList={postList}
                setPostList={setPostList}
              />
            ) : (
              edit
            )}
          </div>
          <button className="selectedpost_button" onClick={() => history.goBack()}>Назад</button>
        </article>
      </Preloader>
    </div>
  );
};
