import { ButtonProps, Calendar, Drawer, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import classes from './calendar.module.less';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { addTemporaryDay } from '@redux/calendarSlice.ts';
import { CalendarCellDay } from '@components/CalendarCellDay.tsx';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import moment from 'moment';
import { ExerciseList } from '@components/ExerciseList.tsx';
import { Exercise } from '@redux/api/trainingApi.ts';
import ModalTrainingList from '@components/Calendar/ModalTrainingList.tsx';
import ModalExercises from '@components/Calendar/ModalExercises.tsx';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useGetTrainingListQuery } from '@redux/api/catalogsApi.ts';

export const CalendarPage = () => {
    const { drawerExercise, setDrawerExercise, setModalExercise, setModalTraining } =
        useMainContext() as MainContextType;
    const [modalErrorInfo, setModalErrorInfo] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [savedExercises, onSaveExercises] = useState<Exercise[]>([]);
    const { error } = Modal;
    const { currentDate, currentTraining } = useAppSelector((state) => state.calendarReducer);
    const { isError, refetch } = useGetTrainingListQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        isError && setModalErrorInfo(true);
    }, [refetch, isError, setModalErrorInfo]);

    useEffect(() => {
        return () => {
            setModalTraining(false);
            setModalExercise(false);
        };
    }, [setModalTraining, setModalExercise]);

    useEffect(() => {
        modalErrorInfo && showModalError();
    }, [modalErrorInfo]);

    const showModalError = useCallback(
        () =>
            error({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При открытии данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Попробуйте ещё раз
                    </span>
                ),
                icon: <CloseCircleOutlined data-test-id='modal-error-user-training-button-close' />,
                onOk: () => refetch(),
                okButtonProps: {
                    'data-test-id': 'modal-error-user-training-button',
                } as ButtonProps,
            }),
        [error, refetch],
    );

    const closeDrawerHandler = () => {
        setDrawerExercise(false);
        const data = savedExercises.filter((exercise: Exercise) => exercise.name !== '');
        dispatch(addTemporaryDay({ name: currentTraining, exercises: data }));
    };

    return (
        <div ref={containerRef}>
            <Calendar dateFullCellRender={(date) => <CalendarCellDay date={moment(date)} />} />
            <ModalTrainingList />
            <ModalExercises />

            <Drawer
                className={classes['drawer-exercise-wrap']}
                title={<div>+ Добавление упражнений</div>}
                closable
                open={drawerExercise}
                onClose={closeDrawerHandler}
            >
                <div className={classes['drawer-subtitle']}>
                    <span>{currentTraining}</span>
                    <span>{currentDate}</span>
                </div>
                <div className={classes['drawer-exercises-container']}>
                    <ExerciseList onSaveExercises={onSaveExercises} />
                </div>
            </Drawer>
        </div>
    );
};
