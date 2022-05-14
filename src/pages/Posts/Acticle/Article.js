import NO_IMAGE from "./../../../assets/img/placeholder.png";
import "./Article.css";
import { Description } from "./Description/Description";
import { ReactComponent as HeartIcon } from "./../../../assets/img/svg/heart-black.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { EditForm } from "../../../components/EditForm/EditForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const Article = ({
  id,
  name,
  description,
  imgSrc = NO_IMAGE,
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
      <div className="btn__group">
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
    <div className="article__item">
      <article className="article__head">
        <div className="article__container">
          <img src={imgSrc} className="article__img" alt={imgAlt} />
        </div>
        <button className="like__btn" onClick={like}>
          <HeartIcon className="like__icon" fill={customFilling} />
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
