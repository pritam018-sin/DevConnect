import { apiSlice } from "./apiSlice";
import { PROJECTS_URL } from "../constants";

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjectsByUsername: builder.query({
            query: (username) => ({
                url: `${PROJECTS_URL}/user/${username}`,
                method: "GET",
            }),
            providesTags: ["Project"],
        }),
    }),
});

export const { useGetProjectsByUsernameQuery } = projectApiSlice;
