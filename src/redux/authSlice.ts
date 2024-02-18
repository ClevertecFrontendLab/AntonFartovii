import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string;
    isSaveAuth: boolean;
    isAuth: boolean;
}

const initialState = {
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
        }
    }
})

export const {setAccessToken, setRememberAuth, setIsAuth} = authSlice.actions;

export default authSlice.reducer;
