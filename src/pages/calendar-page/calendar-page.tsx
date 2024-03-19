import { ButtonProps, Calendar, Drawer, Modal, Typography } from 'antd';
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
import {
    CloseCircleOutlined,
    CloseCircleTwoTone,
    CloseOutlined,
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useGetTrainingListQuery } from '@redux/api/catalogsApi.ts';
import { useWindowSize } from '@uidotdev/usehooks';
import { calendarLocale } from '../../utils.ts';

moment.locale('ru');
moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

export const CalendarPage = () => {
    const {
        drawerExercise,
        setDrawerExercise,
        setModalExercise,
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
        if (size.width) {
            const isFullScreen = size.width >= 800;
            setFullScreen(isFullScreen);
            setCollapsedSider(!isFullScreen);
        }
    }, [size, setFullScreen, setCollapsedSider]);

    useEffect(() => {
        dispatch(deleteTemporaryDay());
    }, [dispatch]);

    useEffect(() => {
        isError && setModalErrorInfo(true);
    }, [isError, setModalErrorInfo]);

    useEffect(() => {
        modalErrorInfo &&
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
                icon: <CloseCircleTwoTone data-test-id='modal-error-user-training-button-close' />,
                onOk: () => refetch(),
                okButtonProps: {
                    'data-test-id': 'modal-error-user-training-button',
                } as ButtonProps,
                centered: true,
                className: 'modal-error',
                width: 384,
                closeIcon: true,
                closable: true,
            });
    }, [modalErrorInfo, error, refetch]);

    useEffect(() => {
        modalErrorSave &&
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
    }, [modalErrorSave, error]);

    const closeDrawerHandler = () => {
        setDrawerExercise(false);
        setModalExercise(true);
    };

    return (
        <>
            <Calendar
                locale={calendarLocale}
                fullscreen={fullScreen}
                dateFullCellRender={(date) => <CalendarCellDay date={moment(date)} />}
            />

            <ModalTrainingList />
            <ModalExercises />

            <Drawer
                maskStyle={{ background: 'unset' }}
                maskClosable={false}
                autoFocus={true}
                data-test-id='modal-drawer-right'
                destroyOnClose={true}
                zIndex={1001}
                width={size.width && size.width > 800 ? 408 : 360}
                className={classes['drawer-exercise-wrap']}
                title={
                    <div>
                        {editMode ? (
                            <Typography.Title level={4}>
                                <EditOutlined /> Редактирование
                            </Typography.Title>
                        ) : (
                            <Typography.Title level={4}>
                                <PlusOutlined width='14px' height='14px' size={14} /> Добавление
                                упражнений
                            </Typography.Title>
                        )}
                    </div>
                }
                closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
                closable
                open={drawerExercise}
                // open={true}
                onClose={closeDrawerHandler}
            >
                <div className={classes['drawer-subtitle']}>
                    <span>{currentTraining}</span>
                    <span className={classes['training-date']}>{currentDate}</span>
                </div>
                <div className={classes['drawer-exercises-container']}>
                    <ExerciseList />
                </div>
            </Drawer>
        </>
    );
};
