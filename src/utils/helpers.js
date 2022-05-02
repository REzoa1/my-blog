import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deletePost } from "../store/slices/posts";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../firebase";

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

export const uploadImage = (
  file,
  imageValue,
  setImageValue,
  setIsLoading,
  isAccount = false
) => {
  if (!file) return;
  const fileSize = file.size / 1024 / 1024;
  if (
    ["image/png", "image/jpg", "image/jpeg"].includes(file.type) &&
    fileSize < 3
  ) {
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    uploadTask.on(
      "state_changed",
      () => setIsLoading(true),
      (error) => console.log(error),
      () => {
        // setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (isAccount) {
            setImageValue({ avatar: downloadURL });
            localStorage.setItem("avatar", downloadURL);
            setIsLoading(false);
          } else {
            setImageValue(downloadURL);
            setIsLoading(false);
          }
        });
      }
    );
  } else
    message.error(
      "Ошибка при загрузке изображения. Выберите другой формат или размер файла."
    );

  // return imageValue;
};
// const uploadFiles = (file) => {
//   if (!file) return;
//   const sotrageRef = ref(storage, `files/${file.name}`);
//   const uploadTask = uploadBytesResumable(sotrageRef, file);

//   uploadTask.on(
//     "state_changed",
//     () => setIsLoading(true),
//     (error) => console.log(error),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// };
