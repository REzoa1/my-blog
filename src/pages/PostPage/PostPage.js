import "./PostPage.css";
import noImage from "./../../assets/img/placeholder.png";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Description } from "../../components/Posts/Acticle/Description/Description";
import { POSTS_URL } from "../../utils/constants";
import { ReactComponent as HeartIcon } from "./../../assets/img/svg/heart-black.svg";

export const PostPage = () => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  // console.log(params);
  useEffect(() => {
    fetch(POSTS_URL + postId)
      .then((res) => res.json())
      .then((res) => setCurrentPost(res))
      .catch(console.log);
  }, []);

  // const customFilling = currentPost.liked ? "crimson" : "black";
  return (
    <div className="container">
      <article className="selectedpost_page">
          <img
            src={currentPost.imgSrc || noImage}
            className="selectedpost__img"
            alt={currentPost.imgAlt}
          />
           <div className="selectedpost_main">
          <h1 className="selectedpost_title">{currentPost.name}</h1>
          <p className="selectedpost__title">{currentPost.description}</p>

          {/* {console.log(isFavourite)} */}

          {/* <div className="like__btn"> */}
            {/* <HeartIcon fill={customFilling} className="like" /> */}
          {/* </div> */}
          <Link to={`/blog`}>Назад</Link>
        </div>
      </article>
    </div>
  );
};
