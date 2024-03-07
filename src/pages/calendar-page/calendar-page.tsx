import { Calendar, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';
import { TrainingListItem, useGetTrainingListQuery } from '@redux/api/catalogsApi.ts';
import { ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils.ts';
import classes from './calendar.module.less';

export const CalendarPage = () => {
    const [modalDate, setModalDate] = useState<boolean>(false);
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const { setLoader } = useLoader() as ILoader;
    const trainingQueryList = useGetTrainingListQuery(undefined);
    const { error } = Modal;
    // data-test-id='modal-error-user-training-title'
    // data-test-id='modal-error-user-training-subtitle'
    // data-test-id='modal-error-user-training-button'
    // data-test-id='modal-error-user-training-button-close'

    const refetch = useCallback(() => {
        Modal.destroyAll();
        trainingQueryList.refetch();
    }, [trainingQueryList]);

    const modalInfo = useCallback(
        () =>
            error({
                title: 'При открытии данных произошла ошибка',
                content: 'Попробуйте ещё раз',
                icon: <CloseCircleOutlined />,
                onOk: refetch,
            }),
        [error, refetch],
    );

    useEffect(() => {
        setLoader(trainingQueryList.isLoading);
    }, [trainingQueryList.isLoading, setLoader]);

    useEffect(() => {
        trainingQueryList.isError && modalInfo();
    }, [trainingQueryList.isError, modalInfo]);

    useEffect(() => {
        if (trainingQueryList.isSuccess) {
            console.log('trainingQueryList.isSuccess', trainingQueryList.data);
        }
    }, [trainingQueryList.isSuccess, trainingQueryList.data]);

    const onSelect = (date) => {
        setDate(formatDate(date._d));
        setModalDate(true);
    };

    const clickModal = () => {
        setModalDate(false);
        setModalAdd(true);
    };

    const handleChange = () => {
        console.log('1');
    };

    const printTrainingList = ({ name, key }: TrainingListItem) => {
        return { name: key, label: name };
    };

    return (
        <div>
            <Calendar onSelect={onSelect} />

            <Modal
                title={<>Тренировки на {date}</>}
                open={modalDate}
                closable={true}
                cancelButtonProps={{ hidden: true }}
                onCancel={() => setModalDate(false)}
                onOk={clickModal}
                okText='Создать тренировку'
                okButtonProps={{ style: { width: '100%' } }}
            >
                Нет активных тренировок
            </Modal>
            <Modal
                className={classes['modal-create-training']}
                closable={false}
                onCancel={() => setModalAdd(false)}
                open={modalAdd}
                title={
                    <>
                        <ArrowLeftOutlined />
                        <Select
                            defaultValue='Выбор типа тренировки'
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            options={trainingQueryList.data?.map(printTrainingList)}
                        />
                    </>
                }
                okText='Добавить упражнения'
            ></Modal>
        </div>
    );
};
