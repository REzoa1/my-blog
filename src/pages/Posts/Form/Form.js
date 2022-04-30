import "./Form.css";
import { useState, useEffect, useCallback, useReducer } from "react";
import { MySelect } from "./MySelect/MySelect";
import { POSTS_URL } from "../../../utils/constants";
import { useCloseForm } from "../../../utils/hooks";
import { createNewPost } from "../../../store/slices/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  CheckOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
  FileAddFilled,
  FileAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../../firebase";
import noImage from "./../../../assets/img/placeholder.png";
import { uploadImage } from "../../../utils/helpers";
import { Preloader } from "../Preloader/Preloader";
import { Button } from "antd";
import Upload from "antd/lib/upload/Upload";

// import { Posts } from "./../Posts"

export const Form = ({
  setIsFormOpen,
  postsList,
  // setPostsList,
  setLocalStorage,
}) => {
  const closeForm = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);
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
  // if (titleValue === " ") {
  //   setTitleValue("");
  // }
  // if (descriptionValue === " ") {
  //   setDescriptionValue("");
  // }

  // console.log(postsList.length++);

  // const [newPost, setNewPost] = useState({})
  // console.log(newPost)
  const dispatch = useDispatch();
  const history = useHistory();
  // const myFunc =useCallback(() => {}, [imageValue]);
  const [imageValue, setImageValue] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const handleUploadImage = (e) => {
    // console.log(e.fileList);
    // e.preventDefault();
    const file = e.fileList[0].originFileObj;
    // console.log(file);
    uploadImage(file, imageValue, setImageValue, setIsLoading);
  };
  // const handleUploadImage = (e) => {
  //   e.preventDefault();

  //   const file = e.target[4].files[0];
  //   console.log(file);
  //   // console.log(e);
  //   // const file = e.target[3].files[0];
  //   uploadImage(file, imageValue, setImageValue, setIsLoading);
  // };

  const handleCreatePost = async (e) => {
    // console.log(imageValue);
    e.preventDefault();
    // const file = e.target[3].files[0];
    // // console.log(file);
    // uploadPostImage(file, setImageValue, imageValue, setProgress);
    // const file = e.target[0].files[0];

    const newPost = {
      name: titleValue,
      description: descriptionValue,
      id: postsList.length + 1,
      liked: false,
      imgSrc: imageValue || noImage,
      // imgSrc: uploadPostImage(file) || noImage,
    };
    history.push("/blog");
    // const result = await promise;
    dispatch(createNewPost(newPost)).finally(() => closeForm());

    // .then(() => console.log(123))
    // .finally(() => closeForm());
    // const idValue = postsList.length + 1;
    // `${+ postsList.length + 1}`

    // setNewPost(UserData);
    // const updatedPosts = [...postsList, ...newPost];

    // setLocalStorage(updatedPosts);
    // setPostsList(updatedPosts);

    // const response = await fetch(POSTS_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newPost),
    // });
    // // console.log(response);
    // const newPostFromServer = await response.json();
    // if (response.ok) {
    //   setPostsList([...postsList, newPostFromServer]);
    //   // setLocalStorage([...postsList, newPostFromServer]);
    // } else {
    //   console.log(new Error(`${response.status} - ${response.statusText}`));
    // }
    // console.log(updatedPosts);
    // closeForm();
  };
  // function onChange(event) {
  //   var file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function(event) {
  //     // The file's text will be printed here
  //     console.log(event.target.result)
  //   };

  //   reader.readAsText(file);
  // }
  return (
    <div className="form_main">
      <form className="form_container" onSubmit={handleCreatePost}>
        <button className="form_button" onClick={closeForm}>
          <CloseOutlined className="form_icon"/>
        </button>
        <Preloader isLoading={isLoading}>
          <Upload 
            beforeUpload={() => {
              return false;
            }}
            onChange={handleUploadImage}
            // type="submit"
            listType="picture"
            maxCount={1}
          >
            <Button className="form_upload" icon={<UploadOutlined />}>Загрузить</Button>
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
          {/* <button onChange={onChange}>dddd</button> */}

          {/* <MySelect /> */}
          {/* <input
          name="photo"
          type="file"
          className="account__input"
          accept=".png,.jpg,.jpeg"
        /> */}
          {/* <div>{progress}</div> */}
          <Button
            type="primary"
            // className="form_button"
            size="large"
            htmlType="submit"
            icon={<FileAddFilled />}
          >
            Добавить пост &nbsp;
          </Button>
          {/* <button className="form_button btn--dowm" type="submit">
              Добавить пост &nbsp;
              <FileAddFilled />
            </button> */}
        </Preloader>
      </form>
    </div>
  );
};

// тут слова. и тут тож.вот еще!
