import { Modal, Select } from 'antd';
import classes from '@pages/calendar-page/calendar.module.less';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
    Training,
    useCreateTrainingMutation,
    useLazyGetTrainingQuery,
    useUpdateTrainingMutation,
} from '@redux/api/trainingApi.ts';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { deleteTemporaryDay, setCurrentTraining } from '@redux/calendarSlice.ts';
import { TrainingListItem } from '@redux/api/catalogsApi.ts';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { ModalContentExercises } from '@components/Calendar/ModalContentExercises.tsx';
import { formatCalendar, getModalCoords } from '../../utils.ts';

export const ModalExercises = () => {
    const dispatch = useAppDispatch();
    const [buttonCancelDisabled, setButtonCancelDisabled] = useState<boolean>(true);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [createTraining, createState] = useCreateTrainingMutation();
    const [updateTraining, updateState] = useUpdateTrainingMutation();
    const [modalCoords, setModalCoords] = useState({});
    const [query, queryState] = useLazyGetTrainingQuery();

    const {
        setModalTraining,
        modalExercise,
        setModalExercise,
        setDrawerExercise,
        calendar,
        setCalendar,
        date,
        setModalErrorSave,
        editMode,
        setEditMode,
        cellRef,
        changeForm,
    } = useMainContext() as MainContextType;
    const { currentDate, temporaryDay, currentTraining, trainingList, currentEditTraining } =
        useAppSelector((state) => state.calendarReducer);
    const size = useWindowSize();

    useEffect(() => {
        const coords = getModalCoords(cellRef, size);
        coords && setModalCoords(coords);
    }, [size, cellRef]);

    useEffect(() => {
        setButtonCancelDisabled(!currentTraining);
    }, [currentTraining]);

    useEffect(() => {
        setButtonLoading(updateState.isLoading);
    }, [updateState.isLoading]);

    useEffect(() => {
        if (updateState.isSuccess || createState.isSuccess) {
            query();
        }
    }, [updateState.isSuccess, createState.isSuccess, query]);

    useEffect(() => {
        if (queryState.isSuccess) {
            const calendar = queryState.data && formatCalendar(queryState.data);
            calendar && setCalendar(calendar);
            setModalExercise(false);
            setModalTraining(true);
        }
    }, [
        queryState.isSuccess,
        dispatch,
        queryState.data,
        setCalendar,
        setModalExercise,
        setModalTraining,
    ]);

    useEffect(() => {
        if (updateState.isError) {
            setModalTraining(false);
            setModalExercise(false);
            setModalErrorSave(true);
        }
    }, [updateState.isError, setModalExercise, setModalTraining, setModalErrorSave]);

    useEffect(() => {
        if (createState.isError) {
            setModalTraining(false);
            setModalExercise(false);
            setModalErrorSave(true);
        }
    }, [createState.isError, setModalTraining, setModalExercise, setModalErrorSave]);

    const backToModalTraining = () => {
        dispatch(deleteTemporaryDay());
        dispatch(setCurrentTraining(''));
        setModalExercise(false);
        setModalTraining(true);
    };

    const onChangeTraining = ({ label }: { [name: string]: string }) => {
        dispatch(setCurrentTraining(label));
    };

    const printTrainingList = () => {
        const existTrainings =
            calendar[currentDate] &&
            calendar[currentDate].map((training: Training) => training.name);

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

    const onSaveExercises = () => {
        const training = temporaryDay.find((training) => training.name === currentTraining);
        const today = new Date();
        const isImplementation = date <= today;
        const body = {
            _id: currentEditTraining?._id,
            date: date,
            isImplementation: isImplementation,
            name: currentTraining,
            exercises: training?.exercises || [],
        };
        editMode ? updateTraining(body as Training) : createTraining(body);
    };

    return (
        <Modal
            mask={false}
            width={size.width && size.width > 480 ? 264 : 360}
            zIndex={999}
            data-test-id='modal-create-exercise'
            wrapProps={{ style: { ...modalCoords } }}
            wrapClassName={classes['modal-wrap']}
            className={classes['modal-exercise']}
            closable={false}
            cancelText='Добавить упражнения'
            cancelButtonProps={{ disabled: buttonCancelDisabled }}
            onCancel={() => {
                setEditMode(false);
                setDrawerExercise(true);
            }}
            okText={size.width && size.width < 800 ? 'Сохранить изменения' : 'Сохранить'}
            okButtonProps={{
                disabled: modalExercise ? !changeForm : true,
                loading: buttonLoading,
            }}
            onOk={onSaveExercises}
            open={modalExercise}
            title={
                <>
                    <ArrowLeftOutlined
                        onClick={backToModalTraining}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        data-test-id='modal-create-exercise-select'
                        allowClear={true}
                        defaultValue={'Выбор типа тренировки'}
                        value={currentTraining ? currentTraining : 'Выбор типа тренировки'}
                        style={{ width: '100%' }}
                        onSelect={(_, option) => onChangeTraining(option)}
                        options={temporaryDay && printTrainingList()}
                    />
                </>
            }
            children={<ModalContentExercises />}
        ></Modal>
    );
};
