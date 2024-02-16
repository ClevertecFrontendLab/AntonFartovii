import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from "@redux/api/authApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
