import classes from '@pages/calendar-page/calendar.module.less';
import { ButtonProps, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { deleteTemporaryDay, setCurrentDate } from '@redux/calendarSlice.ts';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { ModalContentTraining } from '@components/Calendar/ModalContentTraining.tsx';
import { getModalCoords } from '../../utils.ts';

export const ModalTrainingList = () => {
    const [okDisabled, setOkDisabled] = useState<boolean>(false);
    const [modalCoords, setModalCoords] = useState({});
    const { currentDate, trainingList } = useAppSelector((state) => state.calendarReducer);
    const size = useWindowSize();
    const dispatch = useAppDispatch();

    const {
        modalTraining,
        setModalTraining,
        setModalExercise,
        calendar,
        date,
        setEditMode,
        cellRef,
    } = useMainContext() as MainContextType;

    useEffect(() => {
        const coords = getModalCoords(cellRef, size);
        coords && setModalCoords(coords);
    }, [size, cellRef]);

    useEffect(() => {
        const today = new Date();
        const isBeforeDay = date <= today;
        const dayList = calendar[currentDate] || [];
        const isCountEqual = dayList.length === trainingList.length;
        setOkDisabled(isBeforeDay || isCountEqual || false);
    }, [setOkDisabled, currentDate, calendar, date, trainingList.length]);

    const onClose = () => {
        setEditMode(false);
        dispatch(deleteTemporaryDay());
        dispatch(setCurrentDate(''));
        setModalTraining(false);
    };

    const title = (
        <>
            <span className={classes['title-training']}>Тренировки на {currentDate}</span>
            {!calendar[currentDate] && (
                <span className={classes['subtitle-training']}>Нет активных тренировок</span>
            )}
        </>
    );

    return (
        <Modal
            mask={false}
            width={size.width && size.width > 480 ? 264 : 360}
            wrapProps={{
                style: { ...modalCoords },
                'data-test-id': 'modal-create-training',
            }}
            data-test-id='modal-create-training'
            closeIcon={<CloseOutlined data-test-id='modal-create-training-button-close' />}
            wrapClassName={classes['modal-wrap']}
            className={classes['modal-training']}
            title={title}
            open={modalTraining}
            closable={true}
            cancelButtonProps={{ hidden: true } as ButtonProps}
            onCancel={onClose}
            okText={'Создать тренировку'}
            okButtonProps={{ style: { width: '100%' }, disabled: okDisabled }}
            focusTriggerAfterClose={false}
            onOk={() => {
                setModalTraining(false);
                setModalExercise(true);
            }}
            children={<ModalContentTraining />}
        ></Modal>
    );
};
