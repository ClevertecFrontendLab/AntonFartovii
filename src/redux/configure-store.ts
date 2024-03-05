import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { authApi } from '@redux/api/authApi.ts';
import { feedbackApi } from '@redux/api/feedbacksApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice.ts';
import formReducer from './formSlice.ts';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 10,
});

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    authReducer,
    formReducer,
    router: routerReducer,
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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            feedbackApi.middleware,
            localStorageMiddleware,
            routerMiddleware,
        ]),
    preloadedState,
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
