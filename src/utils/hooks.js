import { useEffect, useReducer, useState } from "react";

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

export const useCloseForm = (callback, ref) => {
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    const handleRef = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    window.addEventListener("mousedown", handleRef);
    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("mousedown", handleRef);
      window.removeEventListener("keydown", handleClose);
    };
  }, [callback, ref]);
};

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

export const useAccountState = (url) => {
  const [userState, setUserState] = useReducer(
    (userState, newPost) => ({ ...userState, ...newPost }),
    {
      data: {},
      isLoading: false,
    }
  );
  useEffect(() => {
    setUserState({ isLoading: true });
    fetch(url + "1")
      .then((res) => res.json())
      .then((userDataFromServer) => {
        setUserState({ data: userDataFromServer, isLoading: false });
      })
      .catch((error) => {
        setUserState({ isLoading: false });
        console.log(error);
      });
  }, [url]);
  return { userState, setUserState };
};
