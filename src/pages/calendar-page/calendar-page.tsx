import { ButtonProps, Calendar, Drawer, Modal } from 'antd';
import { useEffect, useState } from 'react';
import classes from './calendar.module.less';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { deleteTemporaryDay } from '@redux/calendarSlice.ts';
import { CalendarCellDay } from '@components/CalendarCellDay.tsx';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import moment from 'moment';
import { ExerciseList } from '@components/ExerciseList.tsx';
import { ModalTrainingList } from '@components/Calendar/ModalTrainingList.tsx';
import { ModalExercises } from '@components/Calendar/ModalExercises.tsx';
import { CloseCircleOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useGetTrainingListQuery } from '@redux/api/catalogsApi.ts';
import { useWindowSize } from '@uidotdev/usehooks';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import LocaleProvider from 'antd/es/locale-provider';
import 'moment/locale/ru.js';

moment.locale('ru_RU');

export const CalendarPage = () => {
    const {
        drawerExercise,
        setDrawerExercise,
        setModalExercise,
        setModalTraining,
        modalErrorSave,
        editMode,
        setCollapsedSider,
    } = useMainContext() as MainContextType;
    const [modalErrorInfo, setModalErrorInfo] = useState<boolean>(false);
    const { error } = Modal;
    const { currentDate, currentTraining } = useAppSelector((state) => state.calendarReducer);
    const [fullScreen, setFullScreen] = useState<boolean>(true);
    const { isError, refetch } = useGetTrainingListQuery();
    const dispatch = useAppDispatch();
    const size = useWindowSize();

    useEffect(() => {
        if (size.width && size.width < 800) {
            setFullScreen(false);
            setCollapsedSider(true);
        } else {
            setFullScreen(true);
            setCollapsedSider(false);
        }
    }, [size]);
    useEffect(() => {
        dispatch(deleteTemporaryDay());
    }, []);

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

    useEffect(() => {
        modalErrorSave && showModalSaveError();
    }, [modalErrorSave]);

    const showModalError = () => {
        error({
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При открытии данных произошла ошибка
                </span>
            ),
            content: (
                <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз</span>
            ),
            icon: <CloseCircleOutlined data-test-id='modal-error-user-training-button-close' />,
            onOk: () => refetch(),
            okButtonProps: {
                'data-test-id': 'modal-error-user-training-button',
            } as ButtonProps,
        });
    };

    const showModalSaveError = () => {
        error({
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При сохранении данных произошла ошибка'
                </span>
            ),
            content: (
                <span data-test-id='modal-error-user-training-subtitle'>
                    Придётся попробовать ещё раз'
                </span>
            ),
            icon: <CloseCircleOutlined data-test-id='modal-error-user-training-button-close' />,
            okText: 'Закрыть',
            okButtonProps: {
                'data-test-id': 'modal-error-user-training-button',
            } as ButtonProps,
        });
    };

    const closeDrawerHandler = () => {
        setDrawerExercise(false);
        setModalExercise(true);
    };

    return (
        <>
            <LocaleProvider locale={ruRu}>
                <Calendar
                    fullscreen={fullScreen}
                    dateFullCellRender={(date) => <CalendarCellDay date={moment(date)} />}
                />
            </LocaleProvider>

            <ModalTrainingList />
            <ModalExercises />

            <Drawer
                autoFocus={true}
                data-test-id='modal-drawer-right'
                destroyOnClose={true}
                forceRender={true}
                zIndex={1001}
                className={classes['drawer-exercise-wrap']}
                title={
                    <div>
                        {editMode ? (
                            <>
                                <EditOutlined /> Редактирование
                            </>
                        ) : (
                            '+ Добавление упражнений'
                        )}
                    </div>
                }
                closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
                closable
                open={drawerExercise}
                onClose={closeDrawerHandler}
            >
                <div className={classes['drawer-subtitle']}>
                    <span>{currentTraining}</span>
                    <span>{currentDate}</span>
                </div>
                <div className={classes['drawer-exercises-container']}>
                    <ExerciseList />
                </div>
            </Drawer>
        </>
    );
};
