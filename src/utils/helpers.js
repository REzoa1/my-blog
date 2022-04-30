import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deletePost } from "../store/slices/posts";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../firebase";

// import { POSTS_URL } from "./constants";

// export const deletePost = async (postId, postsList, setpostLists) => {
//   const isDelete = window.confirm("Удалить пост?");
//   if (isDelete) {
//     const response = await fetch(POSTS_URL + postId, { method: "DELETE" });
//     if (response.ok) {
//       const updatedPostsList = postsList.filter((post) => post.id !== postId);
//       setpostLists(updatedPostsList);
//     } else {
//       console.log(new Error(`${response.status} - ${response.statusText}`));
//     }
//   }
// };

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

// export const uploadAvatar = (file, setUserState, setProgress) => {
//   if (!file) return;
//   const sotrageRef = ref(storage, `files/${file.name}`);
//   const uploadTask = uploadBytesResumable(sotrageRef, file);
//   const fileSize = file.size / 1024 / 1024;
//   if (
//     ["image/png", "image/jpg", "image/jpeg"].includes(file.type) &&
//     fileSize < 3
//   ) {
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (error) => console.log(error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUserState({ avatar: downloadURL });
//           localStorage.setItem("avatar", downloadURL);
//           // console.log("File available at", downloadURL);
//           // return downloadURL;
//         });
//       }
//     );
//   } else
//     alert(
//       "Ошибка при загрузке изображения. Выберите другой формат или размер файла."
//     );
// };

export const uploadImage = (
  file,
  imageValue,
  setImageValue,
  setIsLoading,
  isAccount = false
) => {
  if (!file) return;
  const sotrageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(sotrageRef, file);
  const fileSize = file.size / 1024 / 1024;
  if (
    ["image/png", "image/jpg", "image/jpeg"].includes(file.type) &&
    fileSize < 3
  ) {
    uploadTask.on(
      "state_changed",
      () => setIsLoading(true),
      (error) => console.log(error),
      () => {
        setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (!isAccount) {
            setImageValue(downloadURL);
            setIsLoading(false);
          } else {
            setImageValue({ avatar: downloadURL });
            localStorage.setItem("avatar", downloadURL);
            setIsLoading(false);
          }
        });
      }
    );
  } else
    alert(
      "Ошибка при загрузке изображения. Выберите другой формат или размер файла."
    );

  // return imageValue;
};
// export const uploadImageAccount = (file) => {
//   //
//   if (!file) return;
//   const sotrageRef = ref(storage, `files/${file.name}`);
//   const uploadTask = uploadBytesResumable(sotrageRef, file);

//   uploadTask.on(
//     (error) => console.log(error),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// };
