import "./AddForm.css";
import { useState, useCallback, useRef } from "react";
import { useCloseForm } from "../../../utils/hooks";
import { createNewPost, selectPostsData } from "../../../store/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CloseOutlined,
  FileAddFilled,
  UploadOutlined,
} from "@ant-design/icons";
import noImage from "./../../../assets/img/placeholder.png";
import { uploadImage } from "../../../utils/helpers";
import { Preloader } from "../Preloader/Preloader";
import { Button } from "antd";
import Upload from "antd/lib/upload/Upload";

export const AddForm = ({ setIsFormOpen }) => {
  const { postsList } = useSelector(selectPostsData);
  const closeForm = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);
  const wrapperRef = useRef();
  useCloseForm(closeForm, wrapperRef);
  const [titleValue, setTitleValue] = useState("");
  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };

  const [descriptionValue, setDescriptionValue] = useState("");
  const handleDescriptionValue = (e) => {
    setDescriptionValue(e.target.value);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageValue, setImageValue] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const handleUploadImage = (e) => {
    const file = e.fileList[0].originFileObj;
    uploadImage(file, setImageValue, setIsLoading);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      name: titleValue,
      description: descriptionValue,
      id: postsList.length + 1,
      liked: false,
      imgSrc: imageValue || noImage,
    };
    history.push("/blog");
    dispatch(createNewPost(newPost)).finally(() => closeForm());
  };
  return (
    <div className="form_main">
      <form
        className="form_container"
        onSubmit={handleCreatePost}
        ref={wrapperRef}
      >
        <button className="form_button" onClick={closeForm}>
          <CloseOutlined className="form_icon" />
        </button>
        <Preloader isLoading={isLoading}>
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadImage}
            accept=".png,.jpg,.jpeg"
            maxCount={1}
          >
            <Button className="form_upload" icon={<UploadOutlined />}>
              Загрузить
            </Button>
          </Upload>
          <img
            className="form_img"
            src={imageValue || noImage}
            alt="Картинка поста"
          />
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
            rows="7"
            placeholder="Описание"
            value={descriptionValue}
            onChange={handleDescriptionValue}
            required
          ></textarea>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<FileAddFilled />}
            className="form_upload"
          >
            Добавить пост &nbsp;
          </Button>
        </Preloader>
      </form>
    </div>
  );
};
