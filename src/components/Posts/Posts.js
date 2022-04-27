import { Article } from "./Acticle/Article";
import "./Posts.css";
import { useState, useEffect } from "react";
import { Form } from "./Form/Form";
// import { Test } from "../Test/Test";
import { POSTS_URL } from "../../utils/constants";
import { useDocumentTitle, useFetchPosts } from "../../utils/hooks";
// import { deletePost } from "../../utils/helpers";
import { Preloader } from "../Preloader/Preloader";
import search from "./../../assets/img/svg/search.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  editPost,
  fetchPosts,
  selectPostsData,
  setPostsList,
} from "../../store/slices/posts";
// import { Favourite } from "../../pages/Favourite/Favourite";

export const Posts = ({ title, isFavourite = false }) => {
  const { postsList, isLoading, error } = useSelector(selectPostsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  // const [postsList, setPostsList] = useState([]);

  // const { postsList, setPostsList, postsState } = useFetchPosts(POSTS_URL);

  // console.log(postsState.posts );
  // const postsList = postsState.posts;
  // const setPostsList = () => {
  //   setPostsState({posts: postsList});
  // }
  // const [postsList, setPostsList] = useState(postsState.posts)
  //  console.log(postsList);
  // const [isLoading, setIsLoading] = useState(false);
  // const [postsList, setPostsList] = useState(postsState.posts);
  // const postsList = postsState.posts;

  const likedPosts = postsList.filter((post) => post.liked);
  // if (isFavourite) {
  //   postsList = postsList.filter((post) => post.liked)
  // }
  // const [postsList, setPostsList] = useState(
  //   JSON.parse(localStorage.getItem("postsList")) || []
  // );

  useDocumentTitle("Посты");
  // const [postsList, setPostsList] = useState([]);
  // useEffect(() => {
  //   setLocalStorage(postsList);
  //   setPostsList(postsList);
  // }, []);

  // useEffect(() => {
  //   // console.log('vot');
  //   const fetchPosts = async () => {
  //     const response = await fetch(POSTS_URL);
  //     const json = await response.json();
  //     setPostsList(json);
  //     // setLocalStorage(json)
  //   };
  //   fetchPosts();
  // }, []);

  // console.log(postsList);

  // useEffect(() => {
  //   localStorage.setItem("postsList", JSON.stringify(postsList));
  // }, [postsList]);

  const setLocalStorage = (updatedPosts) => {
    localStorage.setItem("postsList", JSON.stringify(updatedPosts));
  };

  // useEffect(() => {
  //   setLocalStorage(postsList)
  //   const raw = localStorage.getItem("postsList") || [];
  //   setPostsList(JSON.parse(raw))
  //   setLocalStorage(JSON.parse(raw))
  // }, []);

  // const like = async (pos) => {
  //   const updatedPosts = [...postsList];
  //   updatedPosts[pos].liked = !updatedPosts[pos].liked;
  //   // console.log(postsList[pos].id);
  //   const response = await fetch(POSTS_URL + updatedPosts[pos].id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedPosts)
  //   });
  //   if (response.ok) {
  //     const updatedPostFromServer = await response.json();
  //     console.log(updatedPostFromServer);
  //     // setLocalStorage(updatedPostFromServer[pos]);
  //     // setPostsList(updatedPostFromServer[pos]);
  //   }
  // };
  // const [isLiked, setIsLiked] = useState([]);

  // const like = async (post) => {
  //   const updatedPosts = { ...post, liked: !post.liked };
  //   // console.log(updatedPosts);
  //   // console.log(post.id);
  //   const response = await fetch(POSTS_URL + post.id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedPosts),
  //   });
  //   if (response.ok) {
  //     const updatedPostFromServer = await response.json();

  //     // const favoriteList = postsList.filter((post) => {
  //     //   if (post.liked === true) {
  //     //     return updatedPostFromServer;
  //     //   }
  //     // });
  //     // console.log(favoriteList);

  //     const updatedPostsList = postsList.map((post) => {
  //       if (post.id === updatedPostFromServer.id) {
  //         return updatedPostFromServer;
  //       }
  //       return post;
  //     });
  //     dispatch(setPostsList(updatedPostsList));
  //     // setPostsList(updatedPostsList);

  //     // setLocalStorage(updatedPostsList);
  //   } else {
  //     console.log(new Error(`${response.status} - ${response.statusText}`));
  //   }
  // };
  const handleLikePost = (index) => {
    const updatedPosts = [...postsList];
    updatedPosts[index] = {...updatedPosts[index], liked: !updatedPosts[index].liked};
    
    dispatch(editPost(updatedPosts[index]));
  };

  // const deletePost = async (postId) => {
  //   const isDelete = window.confirm("Удалить пост?");
  //   if (isDelete) {
  //     // const updatedPosts = postsList.filter((postsList) => {
  //     //   // console.log(postsList.id);
  //     //   return postsList.id !== postId;
  //     // });
  //     const response = await fetch(POSTS_URL + postId, { method: "DELETE" });
  //     if (response.ok) {
  //       const updatedPostsList = postsList.filter((post) => post.id !== postId);
  //       setPostsList(updatedPostsList);
  //       // setLocalStorage(updatedPostsList);
  //     } else {
  //       console.log(new Error(`${response.status} - ${response.statusText}`));
  //     }

  //     // setLocalStorage(updatedPosts);
  //     // setPostsList(updatedPosts);
  //   }
  // };
  // const myDelete = (postId) => {
  //   deletePost(postId, postsList, setPostsList);
  // };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };
  // const deleteAllPost = () => {
  //   const isDelete = window.confirm("Удалить все посты?");
  //   if (isDelete) {
  //     const updatedPosts = postsList.filter((postsList) => {
  //       return postsList !== postsList;
  //     });
  //     setLocalStorage(updatedPosts);
  //     setPostsList(updatedPosts);
  //   }
  // };

  // const [isLiked, setIsLiked] = useState(like);

  // console.log(postsList[id].id);

  // const openEditForm = (postId) => {
  //   const updatedPosts = postsList.filter((postsList) => {
  //     return postId
  //   });
  //   setIsEditFormOpen(true);
  // };
  const [selectedPost, setSelectedPost] = useState({
    name: "",
    description: "",
  });
  const editFormShow = (blogPost) => {
    // console.log(blogPost);
    setSelectedPost(blogPost);
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const openEditForm = () => setIsEditFormOpen(true);

  // const isFavourite = false;

  const postsUI = (isFavourite ? likedPosts : postsList).map((post, pos) => {
    return (
      <Article
        key={post.id}
        // id={post.id}
        // title={post.name}
        // description={post.description}
        // imgSrc={post.imgSrc}
        // imgAlt={post.imgAlt}
        {...post}
        like={() => handleLikePost(pos)}
        // liked={post.liked}
        deletePost={() => handleDeletePost(post.id)}
        openEditForm={() => openEditForm(post.id)}
        editFormShow={() => editFormShow(post)}
        isEditFormOpen={isEditFormOpen}
        setIsEditFormOpen={setIsEditFormOpen}
        postsList={postsList}
        setPostsList={setPostsList}
        selectedPost={selectedPost}
        // editFormShow={editFormShow}
        // editFormShow={() => editFormShow(selectedPost)}
        setLocalStorage={setLocalStorage}
        setSelectedPost={setSelectedPost}
        // isFavourite={isFavourite}
      />
    );
  });

  // const editFormUI = () => return (
  //     for (let i=0; i in postsList) {
  //       return id=postsList[i].id
  //     }
  // )
  // console.log(editFormUI());

  // useEffect(() => {
  //   const raw = localStorage.setItem("postsList") || [];
  //   setPostsList(JSON.parse(raw));
  // }, []);
  // console.log(postsList.length);
  // const firstTime = JSON.parse(localStorage.getItem("postsList"));
  // console.log(firstTime);
  const [inputValue, setInputValue] = useState("");

  // const handleInputValue = (e) => {
  //   setInputValue(e.target.value)
  // }
  // const posts = []
  const filterValue = (e) => {
    setInputValue(e.target.value);

    // if (e.target.value === "") return setPostsList(postsState.posts);
    if (e.target.value === "") return setPostsList(postsList);
    else
      dispatch(
        setPostsList(
          // setPostsList(
          postsList.filter(
            (item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.description.toLowerCase().includes(inputValue.toLowerCase())
          )
        )
      );
  };

  return (
    <header>
      {/* {!firstTime && ( */}

      {/* <NewPost setPostsList={setPostsList} setIsLoading={setIsLoading} postsList={postsList} />*/}
      {/* {console.log(postsList)}  */}
      {/* )} */}
      {/* {isEditFormOpen && (
        <EditForm
          isEditFormOpen={isEditFormOpen}

          setIsEditFormOpen={setIsEditFormOpen}
          postsList={postsList}
          setPostsList={setPostsList}
          selectedPost={selectedPost}
          // editFormShow={editFormShow}
          // editFormShow={() => editFormShow(selectedPost)}
          setLocalStorage={setLocalStorage}
          setSelectedPost={setSelectedPost}
        />
      )} */}
      <Preloader isLoading={isLoading}>
        {isFormOpen && (
          <Form
            setIsFormOpen={setIsFormOpen}
            postsList={postsList}
            // setPostsList={setPostsList}
            // setLocalStorage={setLocalStorage}
          />
        )}
        <div className="container">
          <h1 className="posts__title">
            <div className="posts__title">
              <input
                value={inputValue}
                onChange={filterValue}
                className="search__input"
                type="text"
                placeholder="Найти"
              />
            </div>

            {title}
            {!isFavourite && (
              <button href="#" className="posts__btn" onClick={openForm}>
                Добавить пост
              </button>
            )}
          </h1>
          {/* <div className="posts"> */}
          <div className="posts">{postsUI}</div>

          {/* style={{backgroundColor: 'blue'}} */}
          {/* <button onClick={() => deletePost(articleInfo[1].id)}></button> */}
          {/* <Article
            title={articleInfo[1].name}
            description={articleInfo[1].description}
            imgSrc="https://images.wallpaperscraft.ru/image/single/gory_art_oblaka_127766_1280x720.jpg"
            liked
          />
          <Article
            title={articleInfo[2].name}
            description={articleInfo[2].description}
          /> */}
          {/* <Article
            title={articleInfo.article4.name}
            description={articleInfo.article4.description}
          />
          <Article
            title={articleInfo.article5.name}
            description={articleInfo.article5.description}
          />
          <Article
            title={articleInfo.article6.name}
            description={articleInfo.article6.description}
          /> */}
          {/* </div> */}
        </div>
      </Preloader>
    </header>
  );
};
