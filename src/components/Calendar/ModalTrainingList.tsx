import classes from '@pages/calendar-page/calendar.module.less';
import { Training } from '@redux/api/trainingApi.ts';
import { Badge, ButtonProps, Empty, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    deleteExercises,
    deleteTemporaryDay,
    setCurrentTraining,
    setTemporaryDay,
} from '@redux/calendarSlice.ts';
import { useEffect, useState } from 'react';

const ModalTrainingList = () => {
    const [oKdisabled, setOkDisabled] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { modalTraining, setModalTraining, setModalExercise, coords } =
        useMainContext() as MainContextType;
    const { currentDate, userCalendar, temporaryDay, trainingList } = useAppSelector(
        (state) => state.calendarReducer,
    );

    useEffect(() => {
        if (!temporaryDay) {
            setOkDisabled(false);
            return;
        }
        const isDisabled = `${temporaryDay.length}` === `${trainingList.length}`;
        setOkDisabled(isDisabled);
    }, []);

    useEffect(() => {
        const temporaryDay = userCalendar[currentDate] && userCalendar[currentDate];
        dispatch(setTemporaryDay(temporaryDay));
    }, []);

    const openModalExercises = (name: string) => {
        dispatch(setCurrentTraining(name));
        setModalExercise(true);
    };

    const onClose = () => {
        dispatch(deleteTemporaryDay());
        dispatch(deleteExercises());
        setModalTraining(false);
    };

    const title = (
        <>
            Тренировки на {currentDate}
            <br />
            {!userCalendar[currentDate] && 'Нет активных тренировок'}
        </>
    );

    return (
        <Modal
            mask={false}
            width='100%'
            wrapProps={{
                style: { top: coords?.top, left: coords?.left },
                'data-test-id': 'modal-create-training',
            }}
            wrapClassName={classes['modal-wrap']}
            className={classes['modal-training']}
            title={title}
            open={modalTraining}
            closable={true}
            cancelButtonProps={
                {
                    hidden: true,
                    'data-test-id': 'modal-create-training-button-close',
                } as ButtonProps
            }
            onCancel={onClose}
            okText={!userCalendar[currentDate] ? 'Создать тренировку' : 'Добавить тренеровку'}
            okButtonProps={{ style: { width: '100%' }, disabled: oKdisabled }}
            onOk={() => setModalExercise(true)}
        >
            {temporaryDay ? (
                temporaryDay.map(({ name }: Training) => (
                    <div key={name} className={classes['modal-training-item']}>
                        <Badge color='blue' text={name} />
                        <EditOutlined
                            onClick={() => openModalExercises(name)}
                            data-test-id='dal-update-training-edit-button'
                        />
                    </div>
                ))
            ) : (
                <Empty
                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                    imageStyle={{ width: 32, height: 32 }}
                    description=''
                />
            )}
        </Modal>
    );
};

export default ModalTrainingList;
