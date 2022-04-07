import "./Form.css";
import { useState, useEffect, useCallback } from "react";
import { MySelect } from "./MySelect/MySelect";
import { POSTS_URL } from "../../../utils/constants";
import { useCloseForm } from "../../../utils/hooks";
// import { Posts } from "./../Posts"

export const Form = ({
  setIsFormOpen,
  postsList,
  setPostsList,
  setLocalStorage,
}) => {

  const closeForm = useCallback(() => setIsFormOpen(false), [setIsFormOpen])
  useCloseForm(closeForm);
  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === "Escape") {
  //       closeForm();
  //     }
  //   };
  //   window.addEventListener("keydown", handleEscape);
  //   return () => {
  //     window.removeEventListener("keydown", handleEscape);
  //   };
  // }, [closeForm]);
  

  const [titleValue, setTitleValue] = useState("");
  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };

  const [descriptionValue, setDescriptionValue] = useState("");
  const handleDescriptionValue = (e) => {
    setDescriptionValue(e.target.value);
  };
  if (titleValue === " ") {
    setTitleValue("");
  }
  if (descriptionValue === " ") {
    setDescriptionValue("");
  }

  // console.log(postsList.length++);

  // const [newPost, setNewPost] = useState({})
  // console.log(newPost)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const idValue = postsList.length + 1;
    // `${+ postsList.length + 1}`
    const newPost = {
      name: titleValue,
      description: descriptionValue,
      id: postsList.length + 1,
      liked: false,
    };

    // setNewPost(UserData);
    // const updatedPosts = [...postsList, ...newPost];

    // setLocalStorage(updatedPosts);
    // setPostsList(updatedPosts);
    const response = await fetch(POSTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    // console.log(response);
    const newPostFromServer = await response.json();
    if (response.ok) {
      setPostsList([...postsList, newPostFromServer]);
      // setLocalStorage([...postsList, newPostFromServer]);
    } else {
      console.log(new Error(`${response.status} - ${response.statusText}`));
    }
    // console.log(updatedPosts);
    closeForm();
  };

  return (
    <div className="form_main">
      <form className="form_container" onSubmit={handleSubmit}>
        <button className="form_button btn--up" onClick={closeForm}>
          Закрыть
        </button>

        <input
          className="form_input"
          type="text"
          placeholder="Заголовок"
          value={titleValue}
          onChange={handleTitleValue}
          required
        />
        <textarea
          className="form_textarea"
          cols="40"
          rows="10"
          placeholder="Описание"
          value={descriptionValue}
          onChange={handleDescriptionValue}
          required
        ></textarea>
        <MySelect />
        <button className="form_button btn--dowm" type="submit">
          Добавить пост
        </button>
      </form>
    </div>
  );
};

// тут слова. и тут тож.вот еще!
