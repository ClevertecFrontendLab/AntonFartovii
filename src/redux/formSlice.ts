import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FormRegister {
    email: string;
    password: string;
}

export interface FormLogin {
    email: string;
}

export interface FormChangePassword {
    password: string;
    confirmPassword: string
}

export interface FormState {
    formRegister: FormRegister;
    formLogin: FormLogin;
    formChangePassword: FormChangePassword;
}

const initialState: FormState = {
    formRegister: {},
    formLogin: {},
    formChangePassword: {},
};

export const formSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFormRegister: (state, action: PayloadAction<FormRegister>) => {
            state.formRegister = action.payload;
        },
        setFormLogin: (state, action: PayloadAction<FormLogin>) => {
            state.formLogin = action.payload;
        },
        setFormChangePassword: (state, action: PayloadAction<FormChangePassword>) => {
            state.formChangePassword = action.payload;
        },
    }
})

export const {setFormRegister, setFormChangePassword, setFormLogin} = formSlice.actions;

export default formSlice.reducer;
