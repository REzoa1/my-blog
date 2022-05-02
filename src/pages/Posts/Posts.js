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
  setPostsList,
} from "../../store/slices/posts";
import { deleteConfirmation } from "../../utils/helpers";
import Search from "antd/lib/transfer/search";

export const Posts = ({ title, isFavourite = false }) => {
  useDocumentTitle(title);

  const { postsList, isLoading, error } = useSelector(selectPostsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const likedPosts = postsList.filter((post) => post.liked);

  const [isFilter, setIsFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(postsList);

  const posts = isFilter ? filteredPosts : isFavourite ? likedPosts : postsList;

  const handleLikePost = (post, index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      liked: !updatedPosts[index].liked,
    };
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

  const [inputValue, setInputValue] = useState("");
  const filterValue = (e) => {
    setIsFilter(true);

    setInputValue(e.target.value);
    if (e.target.value === "") setIsFilter(false);
    // return dispatch(setPostsList(postsList));
    else
      setFilteredPosts(
        (isFavourite ? likedPosts : postsList).filter(
          (item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.description.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
  };
  // isFilter ? filteredPosts : isFavourite ? likedPosts : postsList
  const postsUI = posts.map((post, pos) => {
    return (
      <Article
        key={post.id}
        {...post}
        like={() => handleLikePost(post, pos)}
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
        <div className="posts__title">
          {title}
          <div className="posts__search">
            <Search placeholder="Найти" onChange={filterValue} />
          </div>
        </div>
        <div className="posts">{postsUI}</div>
      </Preloader>
    </div>
  );
};
