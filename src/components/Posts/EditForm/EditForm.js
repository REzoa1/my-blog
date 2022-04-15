import "./EditForm.css";
// import "./../Acticle/Article.css";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { POSTS_URL } from "../../../utils/constants";
import { useCloseForm } from "../../../utils/hooks";

export const EditForm = ({
  setIsEditFormOpen,
  postsList,
  setPostsList,

  selectedPost,
  // setLocalStorage,
  setSelectedPost,
}) => {
  // console.log(isRightPost);
  const closeEditForm = useCallback(() => setIsEditFormOpen(false), [setIsEditFormOpen])
  useCloseForm(closeEditForm);
  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     // console.log(e.target.tagName)
  //     if (e.key === "Escape") {
  //       closeEditForm();
  //     }
  //   };
  //   window.addEventListener("keydown", handleEscape);
  //   return () => {
  //     window.removeEventListener("keydown", handleEscape);
  //   };
  // }, [closeEditForm]);



  // console.log(postsList[0].name);
  // const editForm = (postId) => {
  //   const updatedPosts = postsList.filter((postsList) => {
  //     return postId
  //   });
  //   setIsEditFormOpen(true);
  // };
  // const [editTitleValue, setEditTitleValue] = useState(selectedPost.name);
  const handleEditTitleValue = (e) => {
    setSelectedPost({ ...selectedPost, name: e.target.value });
    // console.log(e.target.value);
  };
  // const [editDescriptionValue, setEditDescriptionValue] = useState(
  //   selectedPost.description
  // );
  const handleEditDescriptionValue = (e) => {
    setSelectedPost({ ...selectedPost, description: e.target.value });
    // setEditDescriptionValue(e.target.value);
  };

  const editAndSavePost = async (e) => {
    e.preventDefault();

    const response = await fetch(POSTS_URL + selectedPost.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedPost),
    });

    if (response.ok) {
      const updatedPostFromServer = await response.json();
      const updatedPostsList = postsList.map((post) => {
        if (post.id === updatedPostFromServer.id) {
          return updatedPostFromServer;
        }

        return post;
      })
      // console.log(updatedPostsList);
      setPostsList(updatedPostsList);
      // setLocalStorage(updatedPostsList);
    } else {
      console.log(new Error(`${response.status} - ${response.statusText}`));
    }
    closeEditForm();
  };

  // const [editIdValue, setEditIdValue] = useState(selectedPost.id);
  // console.log(newPostValue);
  // console.log(setSelectedPost(selectedPost));

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   const editContactId = selectedPost.id;
  //   const savePost = {
  //     id: editContactId,
  //     name: editTitleValue,
  //     description: editDescriptionValue,
  //     liked: selectedPost.liked,
  //     imgSrc: selectedPost.imgSrc,
  //   };
  //   const updatedPosts = [...postsList];
  //   const index = updatedPosts.findIndex((p) => p.id === editContactId);
  //   updatedPosts[index] = savePost;
  //   setLocalStorage(updatedPosts)
  //   setpostLists(updatedPosts);
  //   closeEditForm();
  // };
  // console.log(selectedPost.id === id);
  // const editTitleRef = useRef();
  // const editDescriptionRef = useRef();
  return (
    <div className="editform_main">
      <form className="editform_container" onSubmit={editAndSavePost}>
        <input
          className="editform_input"
          type="text"
          placeholder="Заголовок"
          value={selectedPost.name}
          onChange={handleEditTitleValue}
          required
        />
        <textarea
          className="editform_textarea"
          cols="40"
          // rows="5"
          placeholder="Описание"
          value={selectedPost.description}
          onChange={handleEditDescriptionValue}
          required
        ></textarea>
        <div className="article_btns">
          <button className="btn" onClick={closeEditForm}>
            Закрыть
          </button>
          <button className="btn" type="submit">
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};
