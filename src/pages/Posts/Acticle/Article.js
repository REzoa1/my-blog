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
import { DeleteFilled, DeleteOutlined, DeleteTwoTone, EditFilled, EditOutlined, EditTwoTone } from "@ant-design/icons";
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
  postsList,
  setPostsList,

  selectedPost,
  setLocalStorage,
  setSelectedPost,
  isEditFormOpen,

  // isFavourite,
}) => {
  const showEditForm = () => {
    openEditForm();
    editFormShow();
  };

  // const [isLiked, setIsLiked] = useState(liked);
  // const like = () => setIsLiked(!isLiked);
  const customFilling = liked ? "crimson" : "black";
  // if (!title && !description) {
  //   return null;
  // }
  // const isRightPost = selectedPost.id === id;

  const edit = (
    <>
      {/* <div className="article__main"> */}
      <Link className="article__main" to={`/blog/${id}`}>
        <h3 className="article__title">{name}</h3>
        <Description description={description} />
      </Link>
      {/* </div> */}
      {/* {!isFavourite && ( */}
      <div className="article_btns">
        
        <button className="btn" onClick={showEditForm}>
          {/* Ред. &nbsp;  */}
          <EditOutlined />
        </button>
        <button className="btn" onClick={deletePost} >
        {/* Удалить &nbsp; */}
        <DeleteOutlined />
          
          {/* <img className="link__icons" src={deleteIcon} /> */}
        </button>
      </div>
      {/* )} */}
    </>
  );

  return (
    <div className="posts__item">
      <article className="article__head">
        <div className="article__container">
          <img src={imgSrc} className="article__img" alt={imgAlt} />
        </div>
        {/* {console.log(isFavourite)} */}

        <button className="like__btn" onClick={like}>
          <HeartIcon fill={customFilling} className="like" />
        </button>
        {isEditFormOpen && selectedPost.id === id ? (
          <EditForm
            // isEditFormOpen={isEditFormOpen}
            setIsEditFormOpen={setIsEditFormOpen}
            postList={selectedPost}
            setPostList={setSelectedPost}
            // selectedPost={selectedPost}
            // setSelectedPost={setSelectedPost}
            // setLocalStorage={setLocalStorage}
            // isRightPost={isRightPost}
          />
        ) : (
          edit
        )}
      </article>
    </div>
  );
};
