import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';
import { setTrainingList } from '@redux/calendarSlice.ts';

export type TrainingListItem = {
    name: string;
    key: string;
};

export type User = {
    id: string;
    name: string;
};

export type Period = {
    text: string;
    cost: number;
    days: number;
};

export type Tariff = {
    _id: string;
    name: string;
    periods: Period[];
};

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/catalogs/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = (getState() as RootState).authReducer;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['TrainingList', 'UserList', 'TariffList', 'UserJointTrainingList'],
    endpoints: (builder) => ({
        getTrainingList: builder.query<TrainingListItem[], void>({
            query: () => {
                return {
                    url: 'training-list',
                    method: 'GET',
                };
            },
            providesTags: ['TrainingList'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTrainingList(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getUserList: builder.query<User[], void>({
            query: () => {
                return {
                    url: 'user-list',
                    method: 'GET',
                };
            },
            providesTags: ['UserList'],
        }),
        getTariffList: builder.query<Tariff[], void>({
            query: () => {
                return {
                    url: 'tariff-list',
                    method: 'GET',
                };
            },
            providesTags: ['TariffList'],
        }),
        getUserJointTrainingList: builder.query<Tariff[], void>({
            query: () => {
                return {
                    url: 'user-joint-training-list',
                    method: 'GET',
                };
            },
            providesTags: ['UserJointTrainingList'],
        }),
    }),
});

export const {
    useGetTrainingListQuery,
    useLazyGetTrainingListQuery,
    useGetUserListQuery,
    useGetTariffListQuery,
    useGetUserJointTrainingListQuery,
} = catalogsApi;
