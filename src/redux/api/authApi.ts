import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
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
        login: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;
