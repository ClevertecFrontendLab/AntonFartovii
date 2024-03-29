import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';

export type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type Parameter = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants?: string[];
};

export type Training = {
    _id: string;
    name: string;
    date: Date;
    isImplementation: boolean;
    userId?: string;
    parameters?: Parameter;
    exercises: Exercise[];
};
const baseUrl = 'https://marathon-api.clevertec.ru/training';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
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
    tagTypes: ['Trainings'],
    endpoints: (builder) => ({
        getTraining: builder.query<Training[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            providesTags: ['Trainings'],
        }),
        createTraining: builder.mutation<Training, Omit<Training, '_id' | 'userId'>>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Trainings'],
        }),
        updateTraining: builder.mutation<Training, Training>({
            query: (body) => ({
                url: body._id,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_, __, { _id }) => [{ type: 'Trainings', _id }],
        }),
        deleteTraining: builder.mutation<Record<string, never>, { id: string }>({
            query: ({ id }) => ({
                url: id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Trainings'],
        }),
    }),
});

export const {
    useLazyGetTrainingQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;
