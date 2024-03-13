import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';
import { setUserCalendar, UserCalendar } from '@redux/calendarSlice.ts';
import { formatDate } from '../../utils.ts';

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
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: Parameter;
    exercises: Exercise[];
};

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/training',
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const obj: UserCalendar = {};
                    data.forEach((training: Training) => {
                        const date = formatDate(training.date);
                        const prevStare = obj[date] ? obj[date] : [];
                        obj[date] = [...prevStare, training];
                    });
                    dispatch(setUserCalendar(obj));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        createTraining: builder.mutation<Training, Omit<Training, 'userId'>>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Trainings'],
        }),
        updateTraining: builder.mutation<Training, { id: string; body: Training }>({
            query: ({ id, body }) => ({
                url: id,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Trainings', id }],
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
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;
