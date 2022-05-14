import "./EditForm.css";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/slices/posts";
import { useCloseForm } from "../../utils/hooks";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const EditForm = ({ setIsEditFormOpen, postList, setPostList }) => {
  const [selectedPost, setSelectedPost] = useState(postList);
  const closeEditForm = useCallback(
    () => setIsEditFormOpen(false),
    [setIsEditFormOpen]
  );
  const wrapperRef = useRef();
  useCloseForm(closeEditForm, wrapperRef);

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
    <form className="editform_main" onSubmit={editAndSavePost} ref={wrapperRef}>
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
        placeholder="Описание"
        value={selectedPost.description}
        onChange={handleEditDescriptionValue}
        required
      ></textarea>
      <div className="btn__group">
        <button className="btn" onClick={closeEditForm}>
          <CloseOutlined />
        </button>
        <button className="btn" type="submit">
          <CheckOutlined />
        </button>
      </div>
    </form>
  );
};
