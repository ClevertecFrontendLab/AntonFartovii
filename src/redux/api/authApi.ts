import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setAccessToken} from "@redux/authSlice.ts";
import {Credentials} from "@redux/interfaces.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: "include",
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/registration',
                    method: 'POST',
                    body,
                };
            },
        }),
        login: builder.mutation<{ accessToken: string }, Credentials>({
            query: (body) => {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data: {accessToken}} = await queryFulfilled;
                    dispatch(setAccessToken(accessToken))
                } catch (error) {
                    console.log(error);
                }
            },

        }),
        checkEmail: builder.mutation({
            query: (body: { email: string }) => {
                return {
                    url: 'auth/check-email',
                    method: 'POST',
                    body,
                }
            }
        }),
        confirmEmail: builder.mutation({
            query: (body: { email: string, code: string }) => {
                return {
                    url: 'auth/confirm-email',
                    method: 'POST',
                    body,
                }
            }
        }),
        changePassword: builder.mutation({
            query: (body: { password: string, confirmPassword: string }) => {
                return {
                    url: 'auth/change-password',
                    method: 'POST',
                    body,
                }
            }
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation
} = authApi;
