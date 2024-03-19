import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, setRememberAuth } from '@redux/authSlice.ts';
import { ChangePassword, ConfirmEmail, Credentials } from '@redux/interfaces.ts';
import { setFormChangePassword, setFormLogin, setFormRegister } from '@redux/formSlice.ts';
import { push } from 'redux-first-history';
import { Paths, PathsFull } from '../../routes/Paths.ts';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include',
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation<void, Credentials>({
            query: (body) => {
                return {
                    url: 'auth/registration',
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted(data, { dispatch }) {
                try {
                    dispatch(setFormRegister(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        login: builder.mutation<{ accessToken: string }, Credentials & { remember: boolean }>({
            query: ({ email, password }) => {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: { email, password },
                };
            },
            async onQueryStarted({ remember }, { dispatch, queryFulfilled }) {
                try {
                    const {
                        data: { accessToken },
                    } = await queryFulfilled;
                    dispatch(setAccessToken(accessToken));
                    dispatch(setRememberAuth(remember));
                    dispatch(push(Paths.MAIN + Paths.MAIN_PAGE));
                } catch (error) {
                    dispatch(
                        push(PathsFull.RESULT_ERROR_LOGIN, {
                            key: 'result_redirect',
                            from: '/auth',
                        }),
                    );
                }
            },
        }),
        checkEmail: builder.mutation({
            query: (body: { email: string }) => {
                return {
                    url: 'auth/check-email',
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted({ email }, { dispatch }) {
                try {
                    dispatch(setFormLogin({ email }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        confirmEmail: builder.mutation<void, ConfirmEmail>({
            query: (body) => {
                return {
                    url: 'auth/confirm-email',
                    method: 'POST',
                    body,
                };
            },
        }),
        changePassword: builder.mutation<void, ChangePassword>({
            query: (body) => {
                return {
                    url: 'auth/change-password',
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted(data, { dispatch }) {
                try {
                    dispatch(setFormLogin({}));
                    dispatch(setFormChangePassword(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
