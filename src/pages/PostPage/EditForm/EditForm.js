// import "./EditForm.css";
// import "./../Acticle/Article.css";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { POSTS_URL } from "../../../utils/constants";
import { useCloseForm } from "../../../utils/hooks";

export const EditForm = ({
  setIsEditFormOpen,
  //   postsList,
  //   setPostsList,
  selectedPost,
  setSelectedPost,
}) => {
  const closeEditForm = useCallback(
    () => setIsEditFormOpen(false),
    [setIsEditFormOpen]
  );
  useCloseForm(closeEditForm);

  const handleEditTitleValue = (e) => {
    setSelectedPost({ ...selectedPost, name: e.target.value });
  };
  const handleEditDescriptionValue = (e) => {
    setSelectedPost({ ...selectedPost, description: e.target.value });
  };

  const editAndSavePost = async (e) => {
    e.preventDefault();

    fetch(POSTS_URL + selectedPost.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedPost),
    })
      .then((res) => res.json())
      .then((updatedPostFromServer) => {
        setSelectedPost(updatedPostFromServer);
        setIsEditFormOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // if (response.ok) {
    //   const updatedPostFromServer = await response.json();
    //   setSelectedPost(updatedPostFromServer);
    //   setIsEditFormOpen(false);
    // } else {
    //   console.log(new Error(`${response.status} - ${response.statusText}`));
    // }
  };

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
