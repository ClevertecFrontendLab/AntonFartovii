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
        coords,
        calendar,
        date,
        setEditMode,
    } = useMainContext() as MainContextType;

    useEffect(() => {
        if (size && coords) {
            const value =
                size.width && size.width > coords.left && coords?.left + 312
                    ? {
                          left: coords?.left,
                          top: coords?.top,
                      }
                    : {
                          left: coords?.right - 312,
                          top: coords?.top,
                      };
            setModalCoords(value);
        }
    }, []);

    useEffect(() => {
        const today = new Date();
        if (date <= today) {
            setOkDisabled(true);
        } else {
            if (calendar[currentDate]) {
                if (calendar[currentDate].length === trainingList.length) {
                    setOkDisabled(true);
                } else if (calendar[currentDate].length > 0) {
                    setOkDisabled(false);
                }
            } else {
                setOkDisabled(false);
            }
        }
    }, [currentDate, calendar]);

    const onClose = () => {
        setEditMode(false);
        dispatch(deleteTemporaryDay());
        dispatch(setCurrentDate(''));
        setModalTraining(false);
    };

    const title = (
        <>
            Тренировки на {currentDate}
            <br />
            {!calendar[currentDate] && 'Нет активных тренировок'}
        </>
    );

    return (
        <Modal
            mask={false}
            width='100%'
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
