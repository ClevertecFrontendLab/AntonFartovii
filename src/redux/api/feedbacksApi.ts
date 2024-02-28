import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@redux/configure-store.ts";

export type Feedback = {
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
            }
        }),
        createFeedback: builder.mutation({
            query: (body) => {
                return {
                    url: 'feedback',
                    method: 'POST',
                    body
                };
            },
        }),
    }),
});

export const {useGetFeedbacksQuery, useCreateFeedbackMutation} = feedbackApi;