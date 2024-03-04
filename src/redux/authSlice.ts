import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    accessToken: string;
    isSaveAuth: boolean;
    isAuth: boolean;
};

const initialState: AuthState = {
    accessToken: '',
    isSaveAuth: false,
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRememberAuth: (state, action: PayloadAction<boolean>) => {
            state.isSaveAuth = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setLogout: (state) => {
            state.isAuth = false;
            state.accessToken = '';
        },
    },
});

export const { setAccessToken, setRememberAuth, setIsAuth, setLogout } = authSlice.actions;

export default authSlice.reducer;
