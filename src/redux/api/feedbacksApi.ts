import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';

export type Feedback = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

const baseUrl = 'https://marathon-api.clevertec.ru/feedback';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
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
    tagTypes: ['Feedbacks'],
    endpoints: (builder) => ({
        getFeedbacks: builder.query({
            query: () => {
                return {
                    url: '',
                    method: 'GET',
                };
            },
            providesTags: ['Feedbacks'],
            transformResponse: (response: Feedback[]) =>
                response.sort(
                    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
                ),
        }),
        createFeedback: builder.mutation({
            query: (body) => {
                return {
                    url: '',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['Feedbacks'],
        }),
    }),
});

export const { useGetFeedbacksQuery, useCreateFeedbackMutation } = feedbackApi;
