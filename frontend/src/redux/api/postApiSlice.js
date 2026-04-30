import { apiSlice } from "./apiSlice";
import { POSTS_URL } from "../constants";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPostsByUsername: builder.query({
            query: (username) => ({
                url: `${POSTS_URL}/${username}`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
    }),
});

export const { useGetPostsByUsernameQuery } = postApiSlice;
