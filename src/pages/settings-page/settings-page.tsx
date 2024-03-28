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
    Space,
    Switch,
    Tooltip,
    Typography,
} from 'antd';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import imageTariffFree from '@assets/images/tariff_free.png';
import imageTariffPro from '@assets/images/tariff_pro.png';
import imageTariffProActive from '@assets/images/tariff_pro_active.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/Paths.ts';
import { useUpdateUserMutation } from '@redux/api/userApi.ts';
import { ModalFeedbackAdd } from '@components/Settings/ModalFeedbackAdd.tsx';
import { useBayTariffMutation } from '@redux/api/tariffApi.ts';
import { ModalSuccessTariff } from '@components/Settings/ModalSuccessTariff.tsx';
import { formatDateDDMM } from '../../utils.ts';
import { useWindowSize } from '@uidotdev/usehooks';
import { SwitchSize } from 'antd/es/switch';
import { TariffsParamsList } from '@components/Settings/TariffsParamsList.tsx';

export const SettingsPage = () => {
    const [tariffSider, setTariffSider] = useState<boolean>(false);
    const [modalFeedback, setModalFeedback] = useState<boolean>(false);
    const [modalTariffSuccess, setModalTariffSuccess] = useState<boolean>(false);
    const [buttonTariffSider, setButtonTariffSider] = useState<boolean>(true);
    const [days, setDays] = useState<number | null>(null);
    const [activePro, setActivePro] = useState<boolean>(false);
    const [defaultScreen, setDefaultScreen] = useState<SwitchSize>('default');
    const [dateDDMM, setDateDDMM] = useState<string>('');
    const { user } = useAppSelector((state) => state.userReducer);
    const [updateUser] = useUpdateUserMutation();
    const [bayTariff, bayTariffState] = useBayTariffMutation();
    const queryTariff = useGetTariffListQuery(undefined);
    const dispatch = useAppDispatch();
    const size = useWindowSize();

    useEffect(() => {
        size.width && size.width < 600 ? setDefaultScreen('small') : setDefaultScreen('default');
    }, [size]);

    useEffect(() => {
        if (bayTariffState.isSuccess) {
            setTariffSider(false);
            setModalTariffSuccess(true);
        }
    }, [bayTariffState.isSuccess, setTariffSider, setModalTariffSuccess]);

    useEffect(() => {
        days && setButtonTariffSider(false);
    }, [days, setButtonTariffSider]);

    useEffect(() => {
        const today = new Date();
        const dateValidity = user && user.tariff && new Date(user.tariff.expired);
        const isValid = dateValidity && dateValidity > today;
        isValid && setActivePro(true);
        isValid && setDateDDMM(formatDateDDMM(user.tariff.expired));
    }, [user, setActivePro, setDateDDMM]);

    const onChange = (e: RadioChangeEvent) => setDays(e.target.value);
    const openTariffSider = () => setTariffSider(true);
    const closeTariffSider = () => setTariffSider(false);
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
        <section className={classes['settings-container']}>
            <Row className={classes['settings-wrap']}>
                <Typography.Title level={4}>Мои тариф</Typography.Title>
                <Row gutter={[0, 24]} wrap={true} style={{ maxWidth: '505px' }}>
                    <Row className={classes['cards-container']}>
                        <Card
                            size={'small'}
                            title='FREE tarif'
                            extra={
                                <Typography.Text onClick={openTariffSider}>
                                    Подробнее
                                </Typography.Text>
                            }
                            cover={<img alt='example' src={imageTariffFree} />}
                            actions={[
                                <Space align={'center'}>
                                    <Typography.Text>активен</Typography.Text>
                                    <CheckOutlined />
                                </Space>,
                            ]}
                        />
                        <Card
                            size={'small'}
                            data-test-id='pro-tariff-card'
                            title='PRO tarif'
                            extra={
                                <Typography.Text onClick={openTariffSider}>
                                    Подробнее
                                </Typography.Text>
                            }
                            cover={
                                <img
                                    alt='pro_tariff_image'
                                    src={activePro ? imageTariffProActive : imageTariffPro}
                                />
                            }
                            actions={
                                activePro
                                    ? [
                                          <Space align={'center'}>
                                              <Typography.Text>
                                                  активен <br />
                                                  до {dateDDMM}
                                              </Typography.Text>
                                          </Space>,
                                      ]
                                    : [
                                          <Button type='primary' data-test-id='activate-tariff-btn'>
                                              Активировать
                                          </Button>,
                                      ]
                            }
                        />
                    </Row>
                    <Row className={classes['tools-container']} gutter={[0, 16]}>
                        <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                            <Row wrap={false} style={{ lineHeight: '15px' }}>
                                <Typography.Text>Открыт для совместных тренировок</Typography.Text>
                                <Tooltip
                                    placement='bottomLeft'
                                    title='включеная функция позволит участвовать в совместных тренировках'
                                >
                                    &nbsp;
                                    <ExclamationCircleOutlined data-test-id='tariff-trainings-icon' />
                                </Tooltip>
                            </Row>
                            <Switch
                                size={defaultScreen}
                                data-id='readyForJointTraining'
                                data-test-id='tariff-trainings'
                                defaultChecked={user && user.readyForJointTraining}
                                onChange={onChangeSwitchReadyForJointTraining}
                            />
                        </Row>
                        <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                            <Row wrap={false} style={{ lineHeight: '15px' }}>
                                <Typography.Text>Увеломления</Typography.Text>
                                <Tooltip
                                    placement='bottomLeft'
                                    title='включеная функция позволит получать уведомления об активностях'
                                >
                                    &nbsp;
                                    <ExclamationCircleOutlined data-test-id='tariff-notifications-icon' />
                                </Tooltip>
                            </Row>
                            <Switch
                                size={defaultScreen}
                                data-id='sendNotification'
                                data-test-id='tariff-notifications'
                                defaultChecked={user && user.sendNotification}
                                onChange={onChangeSwitchNotification}
                            />
                        </Row>
                        <Row wrap={false} style={{ width: '100%' }} justify={'space-between'}>
                            <Row wrap={false} style={{ lineHeight: '15px' }}>
                                <Typography.Text disabled={!activePro}>Тёмная тема</Typography.Text>
                                <Tooltip
                                    placement='bottomLeft'
                                    title='темная тема доступна для PRO tarif'
                                >
                                    &nbsp;
                                    <ExclamationCircleOutlined data-test-id='tariff-theme-icon' />
                                </Tooltip>
                            </Row>
                            <Switch
                                size={defaultScreen}
                                data-test-id='tariff-theme'
                                disabled={!activePro}
                            />
                        </Row>
                    </Row>
                    <Row className={classes['buttons-container']} style={{ paddingTop: '72px' }}>
                        <Button type='primary' onClick={openFeedbackModal}>
                            Написать отзыв
                        </Button>
                        <Button type='link' onClick={openFeedbacksPage}>
                            Смотреть все отзывы
                        </Button>
                    </Row>
                </Row>
                <Drawer
                    width={size.width && size.width > 800 ? 408 : 360}
                    closable
                    maskClosable={false}
                    destroyOnClose={true}
                    className={classes['settings-drawer']}
                    maskStyle={{ backgroundColor: 'unset' }}
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
                    <Row style={{ width: '100%', padding: '24px 0px' }} gutter={[0, 24]}>
                        {activePro && (
                            <Alert type='info' message={<>Ваш PRO tarif активен до {dateDDMM}</>} />
                        )}
                        <TariffsParamsList activePro={activePro} />

                        {!activePro && (
                            <>
                                <Typography.Title level={5}>Стоимость тарифа</Typography.Title>
                                <Radio.Group onChange={onChange} value={days}>
                                    <Row
                                        data-test-id='tariff-cost'
                                        gutter={[0, { xs: 4, sm: 4, lg: 16 }]}
                                    >
                                        {queryTariff.data &&
                                            queryTariff.data[0].periods.map((period) => (
                                                <Row
                                                    key={period.cost}
                                                    style={{
                                                        width: '100%',
                                                        height: '32px',
                                                        paddingRight: '8px',
                                                    }}
                                                    align={'middle'}
                                                    justify='space-between'
                                                    wrap={true}
                                                    gutter={[0, 16]}
                                                >
                                                    <Col flex='177px'>{period.text}</Col>
                                                    <Col
                                                        flex='39px'
                                                        className={classes['period-cost']}
                                                    >
                                                        {period.cost
                                                            .toString()
                                                            .split('.')
                                                            .join(',')}
                                                        &nbsp;$
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
                    </Row>
                </Drawer>
                <ModalFeedbackAdd open={modalFeedback} close={setModalFeedback} />
                <ModalSuccessTariff open={modalTariffSuccess} />
            </Row>
        </section>
    );
};
