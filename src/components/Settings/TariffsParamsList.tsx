import { Col, Row } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import classes from '@pages/settings-page/settings.module.less';

type ListParams = {
    name: string;
    free: boolean;
    pro: boolean;
};

const list: ListParams[] = [
    { name: 'Статистика за месяц', free: true, pro: true },
    { name: 'Статистика за всё время', free: false, pro: true },
    { name: 'Совместные тренировки', free: true, pro: true },
    { name: 'Участие в марафонах', free: false, pro: true },
    { name: 'Приложение iOS', free: false, pro: true },
    { name: 'Приложение Android>', free: false, pro: true },
    { name: 'Индивидуальный Chat GPT', free: false, pro: true },
];

const TariffsParamsList = ({ activePro }: { activePro: boolean }) => {
    return (
        <Row gutter={[0, { xs: 12, sm: 12, lg: 24 }]} style={{ marginTop: '24px' }}>
            <Row style={{ width: '100%' }}>
                <Col flex={'auto'}></Col>
                <Col style={{ width: '126px' }}>
                    <Row wrap={false} justify='space-between'>
                        <div className={classes['tag-free']}>FREE</div>
                        <div
                            className={
                                activePro
                                    ? classes['tag-pro'] + ' ' + classes['active']
                                    : classes['tag-pro']
                            }
                        >
                            PRO
                            {activePro && (
                                <>
                                    &nbsp;
                                    <CheckCircleOutlined />
                                </>
                            )}
                        </div>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[0, { xs: 8, sm: 8, lg: 16 }]} className={classes['tariffs-params-list']}>
                {list.map((param) => (
                    <Row style={{ width: '100%', height: '18px' }} key={param.name}>
                        <Col flex={'auto'} className={classes['param-name']}>
                            {param.name}
                        </Col>
                        <Col style={{ width: '126px' }}>
                            <Row wrap={false} justify='space-between'>
                                <Col style={{ width: '56px', textAlign: 'center' }}>
                                    {param.free ? (
                                        <CheckCircleFilled width='17px' height='16px' />
                                    ) : (
                                        <CloseCircleOutlined
                                            className={classes['param-disabled']}
                                        />
                                    )}
                                </Col>
                                <Col style={{ width: '56px', textAlign: 'center' }}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ))}
            </Row>
        </Row>
    );
};

export default TariffsParamsList;
