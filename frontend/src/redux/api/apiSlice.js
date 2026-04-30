import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, updateAccessToken } from "../feature/auth/authSlice";
import { BASE_URL, USERS_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // send cookies (refresh cookie) if backend uses httpOnly cookies
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) headers.set("authorization", `Bearer ${token}`);
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // first try
    let result = await baseQuery(args, api, extraOptions);

    // if 401 -> try refresh, BUT skip if we were already trying to login
    if (result?.error && result.error.status === 401 && args.url !== `${USERS_URL}/login`) {
        try {
            // call refresh endpoint (send cookie or refresh token in body)
            const refreshResult = await baseQuery(
                {
                    url: `${USERS_URL}/refresh-token`,
                    method: "POST",
                    // you can pass refreshToken in body if not using cookie:
                    // body: { refreshToken: api.getState().auth.refreshToken }
                },
                api,
                extraOptions
            );

            if (refreshResult?.data) {
                // refresh endpoint returns { data: { accessToken, newRefreshToken } } (per your backend)
                const newAccessToken = refreshResult.data.data?.accessToken || refreshResult.data.accessToken;
                const newRefreshToken = refreshResult.data.data?.newRefreshToken || refreshResult.data.newRefreshToken;

                if (newAccessToken) {
                    // update redux
                    api.dispatch(updateAccessToken(newAccessToken));
                }
                if (newRefreshToken) {
                    // update refresh token in storage if returned
                    api.dispatch(
                        // reuse setCredentials to update only tokens safely
                        // but we don't have user here; using updateAccessToken and localStorage set for refresh
                        // simpler: update localStorage directly:
                        // (not ideal, but fine)
                        () => {
                            localStorage.setItem("refreshToken", newRefreshToken);
                            return { type: "auth/refresh-token-updated" };
                        }
                    );
                }

                // retry original
                result = await baseQuery(args, api, extraOptions);
            } else {
                // refresh failed -> logout frontend
                api.dispatch(logout());
            }
        } catch (err) {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Videos", "Channels", "Subscription", "Comment", "Playlist", "Tweet", "Post", "Project"],
    endpoints: () => ({}),
});
