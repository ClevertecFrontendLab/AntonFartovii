import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@redux/api/userApi.ts';

export type userState = {
    user: UserEntity | undefined;
};

const initialState: userState = {
    user: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserEntity>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
