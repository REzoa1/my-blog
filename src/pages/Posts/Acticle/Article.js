// import { NO_IMAGE } from "./../img/placeholder.png"
import noImage from "./../../../assets/img/placeholder.png";
import "./Article.css";

import { Description } from "./Description/Description";
import { ReactComponent as HeartIcon } from "./../../../assets/img/svg/heart-black.svg";
import editIcon from "./../../../assets/img/svg/edit.svg";
import deleteIcon from "./../../../assets/img/svg/delete.svg";
// import { useState } from "react";
// import { EditForm } from "./../EditForm/EditForm";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { EditForm } from "../../../components/EditForm/EditForm";
import {
  DeleteFilled,
  DeleteOutlined,
  DeleteTwoTone,
  EditFilled,
  EditOutlined,
  EditTwoTone,
} from "@ant-design/icons";
// import { Favourite } from "../../../pages/Favourite/Favourite";

export const Article = ({
  id,
  name,
  description,
  imgSrc = noImage,
  imgAlt = "No image",
  like,
  liked,
  deletePost,
  openEditForm,
  editFormShow,
  setIsEditFormOpen,
  selectedPost,
  setSelectedPost,
  isEditFormOpen,
}) => {
  const showEditForm = () => {
    openEditForm();
    editFormShow();
  };
  const customFilling = liked ? "crimson" : "black";
  
  const edit = (
    <>
      <Link className="article__main" to={`/blog/${id}`}>
        <h3 className="article__title">
          {name.split(" ").slice(0, 4).join(" ")}
        </h3>
        <Description description={description} />
      </Link>
      <div className="article_btns">
        <button className="btn" onClick={showEditForm}>
          <EditOutlined />
        </button>
        <button className="btn" onClick={deletePost}>
          <DeleteOutlined />
        </button>
      </div>
    </>
  );

  return (
    <div className="posts__item">
      <article className="article__head">
        <div className="article__container">
          <img src={imgSrc} className="article__img" alt={imgAlt} />
        </div>
        <button className="like__btn" onClick={like}>
          <HeartIcon fill={customFilling} className="like" />
        </button>
        {isEditFormOpen && selectedPost.id === id ? (
          <EditForm
            setIsEditFormOpen={setIsEditFormOpen}
            postList={selectedPost}
            setPostList={setSelectedPost}
          />
        ) : (
          edit
        )}
      </article>
    </div>
  );
};
