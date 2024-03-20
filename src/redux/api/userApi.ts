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
    readyForJointTraining: false;
    sendNotification: false;
    tariff: UserTariff;
};
export const userApi = createApi({
    reducerPath: 'userApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/user/',
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
                    url: 'me',
                    method: 'GET',
                };
            },
            providesTags: ['User'],
        }),
        updateTraining: builder.mutation<UserEntity, Omit<UserEntity, 'tariff'>>({
            query: (body) => ({
                url: '',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUserQuery } = userApi;
