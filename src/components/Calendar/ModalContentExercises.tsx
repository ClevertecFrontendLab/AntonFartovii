import { Exercise } from '@redux/api/trainingApi.ts';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import classes from '@pages/calendar-page/calendar.module.less';
import { Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useEffect, useState } from 'react';

export const ModalContentExercises = () => {
    const { modalExercise, setDrawerExercise, setEditMode, calendar } =
        useMainContext() as MainContextType;
    const { currentIndex, temporaryDay, currentTraining } = useAppSelector(
        (state) => state.calendarReducer,
    );
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        const training = temporaryDay.find((training) => training.name === currentTraining);
        if (training && training.exercises) {
            setExercises(training.exercises);
        }
    }, [temporaryDay, currentTraining, modalExercise, calendar]);

    if (!modalExercise) return <></>;

    return (
        <div
            data-test-id={`modal-update-training-edit-button${currentIndex}`}
            style={{ width: '100%', height: '100%' }}
        >
            {exercises &&
                exercises.map((exercise: Exercise) => (
                    <div
                        className={classes['modal-training-item']}
                        key={exercise.name}
                        onClick={() => {
                            setEditMode(true);
                            setDrawerExercise(true);
                        }}
                    >
                        <Badge color='blue' text={exercise?.name} />
                        <EditOutlined />
                    </div>
                ))}
        </div>
    );
};
