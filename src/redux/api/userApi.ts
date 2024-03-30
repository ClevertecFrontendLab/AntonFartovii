import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';

export type UserTariff = {
    tariffId: string;
    expired: string;
};

export type UserEntity = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: UserTariff;
};

const baseUrl = 'https://marathon-api.clevertec.ru/user';
const urlUser = '/me';

export const userApi = createApi({
    reducerPath: 'userApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = (getState() as RootState).authReducer;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<UserEntity, void>({
            query: () => {
                return {
                    url: urlUser,
                    method: 'GET',
                };
            },
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<UserEntity, Partial<UserEntity>>({
            query: (body) => ({
                url: '',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
