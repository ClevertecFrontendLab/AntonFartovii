import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import {authApi} from "@redux/api/authApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

import authReducer from './authSlice.ts';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    authReducer,
});

const saveToLocalStorage = (state: RootState) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};

const loadFromLocalStorage = (): undefined | Partial<RootState> => {
    const state = localStorage.getItem('state');
    if (!state) return undefined;
    return JSON.parse(state);
};

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    saveToLocalStorage(storeAPI.getState());
    return result;
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, localStorageMiddleware]),
    preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
