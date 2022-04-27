import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deletePost } from "../store/slices/posts";

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

export const deleteConfirmation = (postId, dispatch, postPage = false, history) => {
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
