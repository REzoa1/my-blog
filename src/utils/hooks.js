import { useEffect, useReducer, useState } from "react";
import initialImg from "./../assets/img/avatar.png";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `My Blog: ${title}`;
    // return document.title
    // console.log(document.title);
    // return document.title;
  }, [title]);
};

export const useInput = (initialValue, required, type) => {
  const [value, setValue] = useState(initialValue);
  const [isWrong, setIsWrong] = useState("");

  return {
    isWrong,
    formControlProps: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
        if (type === "login") {
          if (/[^\w\ЁёА-я\s*]+/.test(e.target.value)) {
            setIsWrong(
              `Вы ввели недопустимый символ: ${e.target.value.match(
                /([^\w\ЁёА-я\s*]+)/g
              )}`
            );
          } else if (/^.{0,2}$/.test(e.target.value)) {
            setIsWrong("Введите не менее 3 символов.");
          } else setIsWrong("");
        } else if (type === "password") {
          if (/^.{0,7}$/.test(e.target.value)) {
            setIsWrong("Введите не менее 8 символов.");
          } else setIsWrong("");
        }
      },

      onBlur: (e) => {
        if (!e.target.value && required) {
          setIsWrong("Заполните поле");
        } else setIsWrong("");
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


// export const useOnfocusForm = (callback, wrapperRef) => {
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         callback();
//       }
//     }

//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [callback, wrapperRef]);
// };


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
    (postsState, newPost) => ({ ...postsState, ...newPost }),
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

export const useGetSinglePost = (url, postId) => {
  const [postState, setPostState] = useReducer(
    (postState, newPost) => ({ ...postState, ...newPost }),
    {
      post: {},
      isLoading: false,
      error: null,
    }
  );
  const [postList, setPostList] = useState(postState.post);

  useEffect(() => {
    setPostState({ isLoading: true });
    fetch(url + postId)
      .then((res) => res.json())
      .then((postFromServer) => {
        setPostState({ post: postFromServer, isLoading: false });
        setPostList(postFromServer);
      })
      .catch((error) => {
        setPostState({ isLoading: false });
        console.log(error);
      });
  }, [url, postId]);
  return { postList, setPostList, postState, setPostState };
};
