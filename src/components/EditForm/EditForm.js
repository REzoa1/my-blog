import "./EditForm.css";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/slices/posts";
import { useCloseForm } from "../../utils/hooks";

export const EditForm = ({
  setIsEditFormOpen,
  postList,
  setPostList,
  // setSelectedPost,
}) => {
  const [selectedPost, setSelectedPost] = useState(postList);
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

  const dispatch = useDispatch();
  const editAndSavePost = async (e) => {
    e.preventDefault();

    dispatch(editPost(selectedPost)).finally(() => {
      setPostList(selectedPost);
      closeEditForm();
    });
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
