import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Row, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PathNames, Paths } from '../../routes/Paths.ts';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { TitleMainPage } from './HeaderComponents/TitleMainPage.tsx';
import classes from './layout.module.less';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

export const Header = () => {
    const { pathname, state } = useLocation();
    const dispatch = useAppDispatch();
    const { md } = useBreakpoint();

    const paths = pathname.split('/').slice(1);
    const templateLink = (path: string) => (
        <Breadcrumb.Item key={path}>
            <Link to={`/${path}`}>{PathNames[path]}</Link>
        </Breadcrumb.Item>
    );
    const printPath = (path: string) => path !== Paths.MAIN_PAGE && templateLink(path);
    const openSettingPage = () =>
        dispatch(
            push(Paths.MAIN + Paths.SETTINGS_PAGE, {
                from: pathname,
            }),
        );
    const settingBackHandler = () => dispatch(push(state.from || `/${Paths.MAIN_PAGE}`));

    const printMiddlePart = () => {
        if (pathname === `/${Paths.SETTINGS_PAGE}`) {
            return (
                <Space
                    onClick={settingBackHandler}
                    className={classes['header-profile-breadcrumb']}
                    data-test-id='settings-back'
                >
                    <ArrowLeftOutlined />
                    <span>&nbsp;&nbsp;Настройки</span>
                </Space>
            );
        } else if (pathname === `/${Paths.PROFILE_PAGE}`) {
            return (
                <Space
                    className={classes['header-profile-breadcrumb']}
                    style={{ margin: '1px 0px' }}
                >
                    Профиль
                </Space>
            );
        } else if (pathname === `/${Paths.MAIN_PAGE}`) {
            return <TitleMainPage />;
        }
    };

    return (
        <header>
            <Row>
                {[
                    `/${Paths.MAIN_PAGE}`,
                    `/${Paths.CALENDAR_PAGE}`,
                    `/${Paths.FEEDBACKS_PAGE}`,
                ].includes(pathname) && (
                    <Breadcrumb>
                        {templateLink(Paths.MAIN_PAGE)}
                        {paths.map(printPath)}
                    </Breadcrumb>
                )}
            </Row>
            <Row wrap={false}>
                <Col flex={'auto'}>{printMiddlePart()}</Col>
                <Col>
                    {[
                        `/${Paths.MAIN_PAGE}`,
                        `/${Paths.CALENDAR_PAGE}`,
                        `/${Paths.PROFILE_PAGE}`,
                    ].includes(pathname) && (
                        <Space
                            align={'center'}
                            className={classes['header-setting']}
                            wrap={false}
                            onClick={openSettingPage}
                            data-test-id='header-settings'
                        >
                            <div className={classes['setting-icon']}>
                                <SettingOutlined />
                            </div>
                            {md && 'Настройки'}
                        </Space>
                    )}
                </Col>
            </Row>
        </header>
    );
};
