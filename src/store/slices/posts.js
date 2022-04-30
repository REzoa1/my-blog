import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POSTS_URL } from "../../utils/constants";

const initialState = {
  postsList: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(POSTS_URL);
  if (response.ok) {
    // const total = response.headers.get("length");
    // Object.keys(data.shareInfo[i]).length
    // console.log(response);
    // console.log(total);
    // console.log(Math.ceil(total / 12));
    return await response.json();
    
  } else {
    return new Error("Ошибка при получении постов");
  }
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    // const isDelete = window.confirm("Удалить пост?");
    // if (isDelete) {
    const response = await fetch(POSTS_URL + postId, { method: "DELETE" });
    if (response.ok) {
      return await response.json();
    } else {
      return new Error("Ошибка при удалении поста");
    }
    // }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (updatedPost) => {
    const response = await fetch(POSTS_URL + updatedPost.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return new Error("Ошибка при редактировании поста");
    }
  }
);
export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (newPost) => {
    const response = await fetch(POSTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return new Error("Ошибка при создании поста");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsList: (state, action) => {
      state.postsList = action.payload;
    },
    // setIsLoading: (state, action) => {
    //   state.postsList = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.postsList = state.postsList.filter(
        (post) => post.id !== action.payload.id
      );
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(editPost.fulfilled, (state, action) => {
      state.postsList = state.postsList.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.postsList.push(action.payload);
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setPostsList } = postsSlice.actions;
// export const { setIsLoading } = postsSlice.actions;

export const selectPostsData = (state) => state.posts;
