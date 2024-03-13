import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training } from '@redux/api/trainingApi.ts';
import { TrainingListItem } from '@redux/api/catalogsApi.ts';

export type TrainingList = { [key: string]: string };

export type UserCalendar = { [key: string]: Training[] };

export type TemporaryDay = Training[];

export type CalendarState = {
    userCalendar: UserCalendar;
    temporaryDay: TemporaryDay;
    currentDate: string;
    currentTraining: string;
    trainingList: TrainingListItem[];
    exercises: Exercise[];
};

const initialState: CalendarState = {
    userCalendar: {},
    temporaryDay: [],
    currentDate: '',
    currentTraining: '',
    trainingList: [],
    exercises: [],
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        clearCalendar: (state) => {
            state.exercises = [];
            state.temporaryDay = [];
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
                state.temporaryDay.push(training);
            }
        },
        deleteTemporaryDay: (state) => {
            state.temporaryDay = [];
        },
        setUserCalendar: (state, action: PayloadAction<UserCalendar>) => {
            state.userCalendar = action.payload;
        },
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
        setCurrentTraining: (state, action: PayloadAction<string>) => {
            state.currentTraining = action.payload;
        },
        setTrainingList: (state, action: PayloadAction<TrainingListItem[]>) => {
            state.trainingList = action.payload;
        },
        setExercises: (state, action: PayloadAction<Exercise[]>) => {
            state.exercises = action.payload;
        },
        addExercises: (state, action: PayloadAction<Exercise[]>) => {
            if (Array.isArray(state.exercises)) {
                const exercisesToAdd = action.payload.filter(Boolean) as Exercise[];
                state.exercises = [...state.exercises, ...exercisesToAdd];
            } else {
                state.exercises = action.payload.filter(Boolean) as Exercise[];
            }
        },
        deleteExercises: (state) => {
            state.exercises = [];
        },
    },
});

export const {
    setTemporaryDay,
    addTemporaryDay,
    deleteTemporaryDay,
    deleteExercises,
    setUserCalendar,
    addExercises,
    setExercises,
    setCurrentDate,
    setTrainingList,
    setCurrentTraining,
} = calendarSlice.actions;

export default calendarSlice.reducer;
