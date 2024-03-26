import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store.ts';

export type TariffCheckout = {
    userId: string;
    tariffId: string;
    days: number;
    key: string;
};

export type BayTariff = {
    tariffId: string;
    days: number;
};

export const tariffApi = createApi({
    reducerPath: 'tariffApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/tariff',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = (getState() as RootState).authReducer;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['Tariff'],
    endpoints: (builder) => ({
        getTariffCheckout: builder.query<{ message: string }, void>({
            query: () => {
                return {
                    url: '/checkout',
                    method: 'GET',
                };
            },
            providesTags: ['Tariff'],
        }),
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

export const { useLazyGetTariffCheckoutQuery, useBayTariffMutation } = tariffApi;
