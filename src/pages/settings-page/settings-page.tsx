import classes from './settings.module.less';
import { useGetTariffListQuery } from '@redux/api/catalogsApi.ts';
import {
    Alert,
    Button,
    Card,
    Col,
    Drawer,
    Radio,
    RadioChangeEvent,
    Row,
    Switch,
    Tooltip,
    Typography,
} from 'antd';
import {
    CheckCircleFilled,
    CheckOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import imageTariffFree from '../../assets/images/tariff_free.png';
import imageTariffPro from '../../assets/images/tariff_pro.png';
import imageTariffProActive from '../../assets/images/tariff_pro_active.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/Paths.ts';
import { useUpdateUserMutation } from '@redux/api/userApi.ts';
import { ModalFeedbackAdd } from '@components/Settings/ModalFeedbackAdd.tsx';
import { useBayTariffMutation } from '@redux/api/tariffApi.ts';
import ModalSuccessTariff from '@components/Settings/ModalSuccessTariff.tsx';
import { formatDateDDMM } from '../../utils.ts';

export const SettingsPage = () => {
    const [tariffSider, setTariffSider] = useState<boolean>(false);
    const [modalFeedback, setModalFeedback] = useState<boolean>(false);
    const [modalBayTariff, setModalBayTariff] = useState<boolean>(false);
    const [buttonTariffSider, setButtonTariffSider] = useState<boolean>(true);
    const [activePro, setActivePro] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.userReducer);
    const [updateUser, updateState] = useUpdateUserMutation();
    const [bayTariff, bayTariffState] = useBayTariffMutation();
    const queryTariff = useGetTariffListQuery(undefined);
    const dispatch = useAppDispatch();
    const [days, setDays] = useState<number | null>(null);

    useEffect(() => {
        if (bayTariffState.isSuccess) {
            setTariffSider(false);
            setModalBayTariff(true);
        }
    }, [bayTariffState.isSuccess]);

    useEffect(() => {
        days && setButtonTariffSider(false);
    }, [days]);

    useEffect(() => {
        const today = new Date();
        const dateValidity = user && user.tariff && new Date(user.tariff.expired);
        const isValid = dateValidity && dateValidity > today;
        isValid && setActivePro(true);
    }, [user]);

    const onChange = (e: RadioChangeEvent) => {
        setDays(e.target.value);
    };
    const openTariffSider = () => setTariffSider(true);
    const closeTariffSider = () => setTariffSider(false);
    const closeModalSuccess = () => {
        setModalBayTariff(false);
        setTariffSider(true);
    };
    const openFeedbacksPage = () => dispatch(push(`/${Paths.FEEDBACKS_PAGE}`));
    const openFeedbackModal = () => setModalFeedback(true);
    const onChangeSwitchReadyForJointTraining = (checked: boolean) =>
        updateUser({
            readyForJointTraining: checked,
        });
    const onChangeSwitchNotification = (checked: boolean) =>
        updateUser({
            sendNotification: checked,
        });
    const bayTariffHandler = () => {
        days &&
            queryTariff.data &&
            bayTariff({
                tariffId: queryTariff.data[0]._id,
                days,
            });
    };

    return (
        <section className={classes['profile-container']}>
            <Typography.Title level={4}>Мои тарифы</Typography.Title>
            <Row wrap={false} justify={'start'}>
                <Card
                    size={'small'}
                    style={{ marginRight: '25px' }}
                    title='FREE Tarif'
                    extra={
                        <Button type={'link'} onClick={openTariffSider}>
                            Подробнее
                        </Button>
                    }
                    cover={<img alt='example' src={imageTariffFree} />}
                    actions={[
                        <Button type='text' icon={<CheckOutlined />}>
                            активен
                        </Button>,
                    ]}
                />
                <Card
                    size={'small'}
                    data-test-id='pro-tariff-card'
                    title='PRO Tarif'
                    extra={
                        <Button type={'link'} onClick={openTariffSider}>
                            Подробнее
                        </Button>
                    }
                    cover={
                        <img
                            alt='pro_tariff_image'
                            src={activePro ? imageTariffProActive : imageTariffPro}
                        />
                    }
                    actions={
                        activePro
                            ? [<>Активен до {formatDateDDMM(user?.tariff?.expired)}</>]
                            : [
                                  <Button type='primary' data-test-id='activate-tariff-btn'>
                                      Активировать
                                  </Button>,
                              ]
                    }
                />
            </Row>
            <Row
                style={{ marginTop: '16px', marginBottom: '16px', maxWidth: '505px' }}
                gutter={[0, 16]}
            >
                <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                    <Row>
                        <Typography.Text>Открыт для совмечтных тренировок&nbsp;</Typography.Text>
                        <Tooltip
                            placement='bottomLeft'
                            title='включеная функция позволит участвовать в совместных тренировках'
                        >
                            <ExclamationCircleOutlined data-test-id='tariff-trainings-icon' />
                        </Tooltip>
                    </Row>
                    <Switch
                        data-id='readyForJointTraining'
                        data-test-id='tariff-trainings'
                        defaultChecked={user && user.readyForJointTraining}
                        onChange={onChangeSwitchReadyForJointTraining}
                    />
                </Row>
                <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                    <Row>
                        <Typography.Text>Увеломления&nbsp;</Typography.Text>
                        <Tooltip
                            placement='bottomLeft'
                            title='включеная функция позволит получать уведомления об активностях'
                        >
                            <ExclamationCircleOutlined data-test-id='tariff-notifications-icon' />
                        </Tooltip>
                    </Row>
                    <Switch
                        data-id='sendNotification'
                        data-test-id='tariff-notifications'
                        defaultChecked={user && user.sendNotification}
                        onChange={onChangeSwitchNotification}
                    />
                </Row>
                <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                    <Row>
                        <Typography.Text disabled={!activePro}>Тёмная тема&nbsp;</Typography.Text>
                        <Tooltip placement='bottomLeft' title='темная тема доступна для PRO tarif'>
                            <ExclamationCircleOutlined data-test-id='tariff-theme-icon' />
                        </Tooltip>
                    </Row>
                    <Switch data-test-id='tariff-theme' disabled={!activePro} />
                </Row>
            </Row>
            <Row>
                <Button type='primary' onClick={openFeedbackModal}>
                    Написать отзыв
                </Button>
                <Button type='link' onClick={openFeedbacksPage}>
                    Смотреть все отзывы
                </Button>
            </Row>
            <Drawer
                closable
                destroyOnClose={true}
                title='Сравнить тарифы'
                open={tariffSider}
                onClose={closeTariffSider}
                data-test-id='tariff-sider'
                footer={
                    !activePro && (
                        <Button
                            type='primary'
                            data-test-id='tariff-submit'
                            disabled={buttonTariffSider}
                            onClick={bayTariffHandler}
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                {activePro && (
                    <Alert
                        type='info'
                        message={
                            <>Ваш PRO tarif активен до {formatDateDDMM(user?.tariff?.expired)}</>
                        }
                    />
                )}
                <Row style={{ width: '100%' }}>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}></Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>FREE</Col>
                                <Col style={{ width: '56px' }}>PRO</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Статистика за месяц</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Статистика за всё время</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>FREE</Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Совместные тренировки</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Участие в марафонах</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>FREE</Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Приложение iOS</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>FREE</Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Приложение Android</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>FREE</Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col flex={'auto'}>Индивидуальный Chat GPT</Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px' }}>
                                    <CloseCircleOutlined disabled />
                                </Col>
                                <Col style={{ width: '56px' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
                {!activePro && (
                    <>
                        <Typography.Title level={5}>Стоимость тарифа</Typography.Title>
                        <Radio.Group onChange={onChange} value={days}>
                            <Row data-test-id='tariff-cost'>
                                {queryTariff.data &&
                                    queryTariff.data[0].periods.map((period) => (
                                        <Row
                                            key={period.cost}
                                            style={{
                                                width: '100%',
                                                height: '32px',
                                                paddingRight: '8px',
                                            }}
                                            justify='space-between'
                                            wrap={true}
                                            gutter={[0, 16]}
                                        >
                                            <Col flex='177px'>{period.text}</Col>
                                            <Col flex='39px' style={{ textAlign: 'center' }}>
                                                {period.cost.toString().split('.').join(',')}
                                            </Col>
                                            <Col flex='16px'>
                                                <Radio
                                                    value={period.days}
                                                    data-test-id={`tariff-${period.cost}`}
                                                />
                                            </Col>
                                        </Row>
                                    ))}
                            </Row>
                        </Radio.Group>
                    </>
                )}
            </Drawer>
            <ModalFeedbackAdd open={modalFeedback} close={setModalFeedback} />
            <ModalSuccessTariff open={modalBayTariff} close={closeModalSuccess} />
        </section>
    );
};
