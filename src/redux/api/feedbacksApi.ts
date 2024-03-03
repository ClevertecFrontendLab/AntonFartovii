import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@redux/configure-store.ts";

export type Feedback = {
    "id": string,
    "fullName": string | null,
    "imageSrc": string | null,
    "message": string | null,
    "rating": 0,
    "createdAt": string
};

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            const {accessToken} = (getState() as RootState).authReducer;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        }
    }),
    tagTypes: ['Feedbacks'],
    endpoints: (builder) => ({
        getFeedbacks: builder.query({
            query: () => {
                return {
                    url: 'feedback',
                    method: 'GET',
                };
            },
            providesTags: ['Feedbacks'],
            transformResponse: (response: Feedback[]) => response.sort((a, b) =>
                new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        }),
        createFeedback: builder.mutation({
            query: (body) => {
                return {
                    url: 'feedback',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ["Feedbacks"]
        }),
    }),
});

export const {useGetFeedbacksQuery, useCreateFeedbackMutation} = feedbackApi;
