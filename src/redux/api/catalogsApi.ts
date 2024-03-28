import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';
import {
    setTariffList,
    setTrainingList,
    setUserJointTrainingList,
    setUserList,
} from '@redux/catalogsSlice.ts';

export type TrainingListItem = {
    name: string;
    key: string;
};

export type UserListItem = {
    id: string;
    name: string;
};

export type Period = {
    text: string;
    cost: number;
    days: number;
};

export type TariffListItem = {
    _id: string;
    name: string;
    periods: Period[];
};

export type UserJointTrainingListItem = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: null;
    avgWeightInWeek: number;
    status: null;
    inviteId: null;
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
        getUserList: builder.query<UserListItem[], void>({
            query: () => {
                return {
                    url: 'user-list',
                    method: 'GET',
                };
            },
            providesTags: ['UserList'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserList(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getTariffList: builder.query<TariffListItem[], void>({
            query: () => {
                return {
                    url: 'tariff-list',
                    method: 'GET',
                };
            },
            providesTags: ['TariffList'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTariffList(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getUserJointTrainingList: builder.query<UserJointTrainingListItem[], void>({
            query: () => {
                return {
                    url: 'user-joint-training-list',
                    method: 'GET',
                };
            },
            providesTags: ['UserJointTrainingList'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserJointTrainingList(data));
                } catch (error) {
                    console.log(error);
                }
            },
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
