import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RcFile } from 'antd/es/upload';
import { RootState } from '@redux/configure-store.ts';

export type UploadFileResponse = {
    name: string;
    url: string;
};

export type UploadFileRequest = {
    file: string | RcFile | Blob;
};

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/upload-image/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = (getState() as RootState).authReducer;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        uploadFile: builder.mutation<UploadFileResponse, UploadFileRequest>({
            query: ({ file }) => ({
                url: '',
                method: 'POST',
                body: file,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = uploadApi;
