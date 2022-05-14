import { Article } from "./Acticle/Article";
import "./Posts.css";
import { useState, useEffect } from "react";
import { useDocumentTitle } from "../../utils/hooks";
import { Preloader } from "./Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import {
  editPost,
  fetchPosts,
  selectPostsData,
} from "../../store/slices/posts";
import { deleteConfirmation } from "../../utils/helpers";
import Search from "antd/lib/transfer/search";

export const Posts = ({ title, isFavourite = false }) => {
  useDocumentTitle(title);

  const { postsList, isLoading } = useSelector(selectPostsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const likedPosts = postsList.filter((post) => post.liked);

  const [isFilter, setIsFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(postsList);

  const posts = isFilter ? filteredPosts : isFavourite ? likedPosts : postsList;

  const handleLikePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      liked: !updatedPosts[index].liked,
    };
    setFilteredPosts(updatedPosts);
    dispatch(editPost(updatedPosts[index]));
  };

  const handleDeletePost = (postId) => {
    deleteConfirmation(postId, dispatch);
  };

  const [selectedPost, setSelectedPost] = useState({
    name: "",
    description: "",
  });
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const openEditForm = () => setIsEditFormOpen(true);
  const editFormShow = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const filterValue = (e) => {
    if (e.target.value === "") setIsFilter(false);
    else {
      setIsFilter(true);
      setFilteredPosts(
        (isFavourite ? likedPosts : postsList).filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  const postsUI = posts.map((post, pos) => {
    return (
      <Article
        key={post.id}
        {...post}
        like={() => handleLikePost(pos)}
        deletePost={() => handleDeletePost(post.id)}
        openEditForm={() => openEditForm(post.id)}
        editFormShow={() => editFormShow(post)}
        isEditFormOpen={isEditFormOpen}
        setIsEditFormOpen={setIsEditFormOpen}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    );
  });

  return (
    <div className="container">
      <Preloader isLoading={isLoading}>
        <div className="posts__header">
          <h1 className="posts__title">{title}</h1>
          <div>
            <Search placeholder="Найти" onChange={filterValue} />
          </div>
        </div>
        {postsUI.length ? (
          <div className="posts">{postsUI}</div>
        ) : (
          <div className="posts__empty">...постов нет</div>
        )}
      </Preloader>
    </div>
  );
};
