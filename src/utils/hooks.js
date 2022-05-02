import { useEffect, useReducer, useState } from "react";
import noAvatar from "./../assets/img/avatar.png";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `My Blog: ${title}`;
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
        switch (type) {
          case "login":
            const loginValid = e.target.value.match(/([^\wЁёА-я\s*]+)/g);
            loginValid
              ? setIsWrong(`Вы ввели недопустимый символ: ${loginValid}`)
              : e.target.value.length < 3
              ? setIsWrong("Введите не менее 3 символов.")
              : setIsWrong("");
            break;
          case "password":
            e.target.value.length < 8
              ? setIsWrong("Введите не менее 8 символов.")
              : setIsWrong("");
            break;
          default:
            setIsWrong("Заполните поле");
        }
      },
      onBlur: (e) => {
        if (!e.target.value && required) {
          setIsWrong("Заполните поле");
        }
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

export const useAccountState = () => {
  const [userState, setUserState] = useReducer(
    (userState, newPost) => ({ ...userState, ...newPost }),
    {
      avatar: localStorage.getItem("avatar") || noAvatar,
      userName: localStorage.getItem("LoginValue"),
      age: localStorage.getItem("age") || 1,
    }
  );
  return { userState, setUserState };
};
