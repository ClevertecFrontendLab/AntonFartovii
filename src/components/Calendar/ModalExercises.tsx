import { Badge, Modal, Select } from 'antd';
import classes from '@pages/calendar-page/calendar.module.less';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Exercise, Training } from '@redux/api/trainingApi.ts';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setCurrentTraining, setExercises } from '@redux/calendarSlice.ts';
import { TrainingListItem } from '@redux/api/catalogsApi.ts';
import { useEffect, useState } from 'react';

const ModalExercises = () => {
    const dispatch = useAppDispatch();
    const [cancelDisabled, setCancelDisabled] = useState<boolean>(false);

    const { setModalTraining, modalExercise, setModalExercise, setDrawerExercise, coords } =
        useMainContext() as MainContextType;
    const { userCalendar, currentDate, temporaryDay, currentTraining, exercises, trainingList } =
        useAppSelector((state) => state.calendarReducer);

    useEffect(() => {
        if (temporaryDay) {
            const training = temporaryDay.find(
                (training: Training) => training.name === currentTraining,
            );
            const data = (training && training.exercises) || [];
            dispatch(setExercises(data));
        }
    }, [currentTraining]);

    useEffect(() => {
        // const isExercises = temporaryDay[currentTraining].exercises.length > 0;
        // setCancelDisabled(!isExercises);
    }, [exercises]);

    useEffect(() => {
        printTrainingList();
    }, []);

    const backToModalTraining = () => {
        dispatch(setCurrentTraining(''));
        setModalExercise(false);
        setModalTraining(true);
    };

    const onChangeTraining = ({ label }: { [name: string]: any }) => {
        dispatch(setCurrentTraining(label));
    };

    const printTrainingList = () => {
        const existTrainings =
            userCalendar[currentDate] &&
            userCalendar[currentDate].map((training: Training) => training.name);

        if (existTrainings && existTrainings.length > 0) {
            const data = trainingList.filter((item) => !existTrainings.includes(item.name));
            return printOptions(data);
        }
        return printOptions(trainingList);
    };

    const printOptions = (array: TrainingListItem[] = []) => {
        return array.map((item) => {
            return {
                label: item.name,
                value: item.key,
            };
        });
    };

    return (
        <Modal
            mask={false}
            width='100%'
            wrapProps={{ style: { top: coords?.top, left: coords?.left } }}
            wrapClassName={classes['modal-wrap']}
            className={classes['modal-exercise']}
            closable={false}
            cancelText='Сохранить'
            cancelButtonProps={{ disabled: cancelDisabled }}
            onCancel={() => setModalExercise(false)}
            open={modalExercise}
            title={
                <>
                    <ArrowLeftOutlined onClick={backToModalTraining} />
                    <Select
                        allowClear={true}
                        defaultValue={'Выбор типа тренировки'}
                        value={currentTraining ? currentTraining : 'Выбор типа тренировки'}
                        style={{ width: '100%' }}
                        onSelect={(_, option) => onChangeTraining(option)}
                        options={printTrainingList()}
                    />
                </>
            }
            okText='Добавить упражнения'
            onOk={() => setDrawerExercise(true)}
        >
            {exercises &&
                exercises.map((exercise: Exercise) => (
                    <div className={classes['modal-training-item']}>
                        <Badge color='blue' text={exercise?.name} />
                        <EditOutlined onClick={() => setDrawerExercise(true)} />
                    </div>
                ))}
        </Modal>
    );
};

export default ModalExercises;
