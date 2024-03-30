import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';

export type BayTariff = {
    tariffId: string;
    days: number;
};

const baseUrl = 'https://marathon-api.clevertec.ru/tariff';

export const tariffApi = createApi({
    reducerPath: 'tariffApi',
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
    tagTypes: ['Tariff'],
    endpoints: (builder) => ({
        bayTariff: builder.mutation<void, BayTariff>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Tariff'],
        }),
    }),
});

export const { useBayTariffMutation } = tariffApi;
