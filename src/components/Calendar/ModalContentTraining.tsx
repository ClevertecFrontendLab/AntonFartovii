import { Training } from '@redux/api/trainingApi.ts';
import classes from '@pages/calendar-page/calendar.module.less';
import { Badge, Button, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import {
    setCurrentEditTraining,
    setCurrentIndex,
    setCurrentTraining,
    setTemporaryDay,
} from '@redux/calendarSlice.ts';
import { useEffect, useState } from 'react';
import { EditTwoTone } from '@ant-design/icons';

export const ModalContentTraining = () => {
    const { modalTraining, setModalTraining, setModalExercise, calendar, setEditMode } =
        useMainContext() as MainContextType;
    const { temporaryDay, currentDate } = useAppSelector((state) => state.calendarReducer);
    const [trainings, setTrainings] = useState<Training[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const trainings = calendar[currentDate] || [];
        setTrainings(trainings);
        dispatch(setTemporaryDay(trainings));
    }, [modalTraining, calendar, currentDate, dispatch]);

    const openEditModalExercises = (name: string, index: number, isImplementation: boolean) => {
        if (isImplementation) return;
        const training = temporaryDay.find((training: Training) => training.name === name);
        dispatch(setCurrentEditTraining(training));
        dispatch(setCurrentTraining(name));
        dispatch(setCurrentIndex(index));
        setEditMode(true);
        setModalTraining(false);
        setModalExercise(true);
    };

    const printTraining = ({ name, isImplementation }: Training, index: number) => {
        return (
            <Button
                type='text'
                style={{ width: '100%' }}
                key={name}
                onClick={() => openEditModalExercises(name, index, isImplementation)}
                className={classes['modal-training-item']}
                data-test-id={`modal-update-training-edit-button${index}`}
                disabled={isImplementation}
            >
                <Badge color='blue' text={name} />
                <EditTwoTone disabled={isImplementation} />
            </Button>
        );
    };

    if (!modalTraining) return <></>;

    return (
        <>
            {trainings && trainings.length > 0 ? (
                trainings.map(printTraining)
            ) : (
                <Empty
                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                    imageStyle={{ width: 32, height: 32 }}
                    description=''
                />
            )}
        </>
    );
};
