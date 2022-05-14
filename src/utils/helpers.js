import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deletePost } from "../store/slices/posts";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../firebase";
import { USER_URL } from "./constants";

export const deleteConfirmation = (
  postId,
  dispatch,
  postPage = false,
  history
) => {
  const { confirm } = Modal;
  confirm({
    title: "Удалить пост?",
    icon: <ExclamationCircleOutlined />,
    okText: "Да",
    okType: "danger",
    cancelText: "Нет",
    onOk() {
      if (postPage) {
        dispatch(deletePost(postId)).then(() => history.goBack());
      } else {
        dispatch(deletePost(postId));
      }
    },
  });
};

export const uploadImage = (file, setImageValue, setIsLoading) => {
  if (!file) return;
  const fileValidate =
    ["image/png", "image/jpg", "image/jpeg"].includes(file.type) &&
    file.size / 1024 / 1024 < 3;
  if (fileValidate) {
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    uploadTask.on(
      "state_changed",
      () => setIsLoading(true),
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageValue(downloadURL);
          setIsLoading(false);
        });
      }
    );
  } else {
    message.error(
      "Ошибка при загрузке изображения. Выберите другой формат или размер файла."
    );
  }
};

export const editUserData = async (d) => {
  const response = await fetch(USER_URL + "1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(d),
  });
  if (response.ok) {
    return await response.json();
  } else {
    return new Error("Ошибка при редактировании поста");
  }
};