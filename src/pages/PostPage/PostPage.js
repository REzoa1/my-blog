import "./PostPage.css";
import { Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import noImage from "./../../assets/img/placeholder.png";
import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { POSTS_URL } from "../../utils/constants";
import { ReactComponent as HeartIcon } from "./../../assets/img/svg/heart-black.svg";
import { useGetSinglePost } from "../../utils/hooks";
// import { EditForm } from "./EditForm/EditForm";
import { useDispatch } from "react-redux";
import { deletePost, editPost, setPostsList } from "../../store/slices/posts";
import { EditForm } from "../../components/EditForm/EditForm";
import { deleteConfirmation } from "../../utils/helpers";

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

  const handleLikePost = () => {
    const updatedPost = { ...postList, liked: !postList.liked };
    dispatch(editPost(updatedPost)).finally(() => {
      setPostList(updatedPost);
    });
  };

  const postPage = true;
  const handleDeletePost = () => {
    // dispatch(deletePost(postId))
    deleteConfirmation(postId, dispatch, postPage, history);

    // const isDelete = window.confirm("Удалить пост?");
    // if (isDelete) {
    // dispatch(deletePost(postId))
    // .then(() => history.goBack())
    // }

    // const { confirm } = Modal;
    // confirm({
    //   title: "Удалить пост?",
    //   icon: <ExclamationCircleOutlined />,
    //   okText: "Да",
    //   okType: "danger",
    //   cancelText: "Нет",
    //   onOk() {
    //     dispatch(deletePost(postId)).then(() => history.goBack());
    //   },
    // });
    // .then(() => history.goBack())
    // const isDelete = window.confirm("Удалить пост?");
    // if (isDelete) {
    //   fetch(POSTS_URL + postId, { method: "DELETE" })
    //     .then(() => history.goBack())
    //     .catch((error) => console.log(error));
    // }
  };

  const customFilling = liked ? "crimson" : "black";

  const edit = (
    <>
      <h1 className="selectedpost_title">{name}</h1>
      <p className="selectedpost__title">{description}</p>
      <div className="article_btns">
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
      <article className="selectedpost_page">
        <div className="selectedpost_container">
          <img
            src={imgSrc || noImage}
            className="selectedpost__img"
            alt={imgAlt}
          />

          <div className="like__btn" onClick={handleLikePost}>
            <HeartIcon fill={customFilling} className="like" />
          </div>
        </div>

        <div className="selectedpost_main">
          {isEditFormOpen ? (
            <EditForm
              setIsEditFormOpen={setIsEditFormOpen}
              // selectedPost={postList}
              postList={postList}
              setPostList={setPostList}
              // setSelectedPost={setPostList}
            />
          ) : (
            edit
          )}
        </div>
        <Link to={`/blog`}>Назад</Link>
      </article>
    </div>
  );
};
