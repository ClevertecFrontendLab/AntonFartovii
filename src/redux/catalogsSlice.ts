import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    TariffListItem,
    TrainingListItem,
    UserJointTrainingListItem,
    UserListItem,
} from '@redux/api/catalogsApi.ts';

export type catalogsState = {
    tariffList: TrainingListItem[];
    trainingList: TrainingListItem[];
    userList: UserListItem[];
    userJointTrainingList: UserJointTrainingListItem[];
};

const initialState: catalogsState = {
    tariffList: [],
    trainingList: [],
    userList: [],
    userJointTrainingList: [],
};

export const catalogsSlice = createSlice({
    name: 'catalogs',
    initialState,
    reducers: {
        setTariffList: (state, action: PayloadAction<TariffListItem[]>) => {
            state.tariffList = action.payload;
        },
        setTrainingList: (state, action: PayloadAction<TrainingListItem[]>) => {
            state.trainingList = action.payload;
        },
        setUserList: (state, action: PayloadAction<UserListItem[]>) => {
            state.userList = action.payload;
        },
        setUserJointTrainingList: (state, action: PayloadAction<UserJointTrainingListItem[]>) => {
            state.userJointTrainingList = action.payload;
        },
    },
});

export const { setUserJointTrainingList, setTariffList, setTrainingList, setUserList } =
    catalogsSlice.actions;

export default catalogsSlice.reducer;
