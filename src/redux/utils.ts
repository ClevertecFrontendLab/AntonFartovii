import { RootState } from '@redux/configure-store.ts';
import { BaseQueryApi } from '@reduxjs/toolkit/query';

export const prepareHeaders = (
    headers: Headers,
    { getState }: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>,
): Headers => {
    const { accessToken } = (getState() as RootState).authReducer;
    headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
};
