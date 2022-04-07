import { useEffect, useReducer, useState } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `My Blog: ${title}`;
    // return document.title
    // console.log(document.title);
    // return document.title;
  }, [title]);
};

export const useInput = (initialValue, required) => {
  const [value, setValue] = useState(initialValue);
  const [isEmpty, setIsEmpty] = useState(false);

  return {
    isEmpty,
    formControlProps: {
      value,
      onChange: (e) => setValue(e.target.value),
      onBlur: (e) => {
        if (!e.target.value && required) {
          setIsEmpty(true);
        } else setIsEmpty(false);
      },
      required,
    },
  };
};

export const useCloseForm = (callback) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
};
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "fetch":
//       return {
//         ...state,
//         posts: action.payload,
//       };
//     case "posts":
//       return {
//         ...state,
//         type: action.type,
//       };
//     case "load":
//       return {
//         ...state,
//         isLoading: !state.isLoading,
//       };
//     case "error":
//       return {
//         ...state,
//         error: state.error,
//       };
//     default:
//       return state;
//   }
// };
export const useFetchPosts = (url) => {
  const [postsState, setPostsState] = useReducer(
    (postsState, newPost) => {
      return { ...postsState, ...newPost };
    },
    {
      posts: [],
      isLoading: false,
      error: null,
    }
  );
  const [postsList, setPostsList] = useState(postsState.posts);

  useEffect(() => {
    setPostsState({ isLoading: true });
    fetch(url)
      .then((res) => res.json())
      .then((postsFromServer) => {
        setPostsState({ posts: postsFromServer, isLoading: false });
        setPostsList(postsFromServer);
      })
      .catch((error) => {
        setPostsState({ isLoading: false });
        console.log(error);
      });
  }, [url]);
  return { postsList, setPostsList, postsState };
};
