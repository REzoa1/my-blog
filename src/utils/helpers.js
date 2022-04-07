import { POSTS_URL } from "./constants";

export const deletePost = async (postId, postsList, setpostLists) => {
    const isDelete = window.confirm("Удалить пост?");
    if (isDelete) {
      const response = await fetch(POSTS_URL + postId, { method: "DELETE" });
      if (response.ok) {
        const updatedPostsList = postsList.filter((post) => post.id !== postId);
        setpostLists(updatedPostsList);
      } else {
        console.log(new Error(`${response.status} - ${response.statusText}`));
      }
    }
  };
  