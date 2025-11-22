import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, addPost } = postSlice.actions;
export default postSlice.reducer;
