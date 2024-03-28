import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training } from '@redux/api/trainingApi.ts';

export type TrainingList = { [key: string]: string };

export type UserCalendar = { [key: string]: Training[] };

export type TemporaryDay = Training[];

export type CalendarState = {
    temporaryDay: TemporaryDay;
    currentDate: string;
    currentTraining: string;
    currentIndex: number;
    currentEditTraining: Training | undefined;
};

const initialState: CalendarState = {
    temporaryDay: [],
    currentEditTraining: undefined,
    currentDate: '',
    currentTraining: '',
    currentIndex: 0,
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCurrentEditTraining: (state, action: PayloadAction<Training | undefined>) => {
            state.currentEditTraining = action.payload;
        },
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        },
        setTemporaryDay: (state, action: PayloadAction<TemporaryDay>) => {
            state.temporaryDay = action.payload;
        },
        addTemporaryDay: (
            state,
            action: PayloadAction<{ name: string; exercises: Exercise[] }>,
        ) => {
            const name = action.payload.name;
            const exercises = action.payload.exercises;
            const index = state.temporaryDay.findIndex((training) => training.name === name);
            if (index !== -1) {
                const training = state.temporaryDay[index];
                if (training.exercises) {
                    training.exercises = [...training.exercises, ...exercises];
                } else {
                    training.exercises = exercises;
                }
                state.temporaryDay[index] = training;
            } else {
                const training = {
                    name,
                    exercises,
                };
                state.temporaryDay.push(training as Training);
            }
        },
        deleteTemporaryDay: (state) => {
            state.temporaryDay = [];
        },
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
        setCurrentTraining: (state, action: PayloadAction<string>) => {
            state.currentTraining = action.payload;
        },
    },
});

export const {
    setCurrentEditTraining,
    setCurrentIndex,
    setTemporaryDay,
    addTemporaryDay,
    deleteTemporaryDay,
    setCurrentDate,
    setCurrentTraining,
} = calendarSlice.actions;

export default calendarSlice.reducer;
