import { Typography } from 'antd/';
import classes from './layout.module.less';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PathNames, Paths } from '../../routes/Paths.ts';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import React from 'react';

export const Header = () => {
    const { pathname, state } = useLocation();
    const dispatch = useAppDispatch();

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
    const printHeader = () => {
        if (pathname === `/${Paths.PROFILE_PAGE}`) {
            return <Typography.Title level={5}>Профиль</Typography.Title>;
        }
        if (pathname === `/${Paths.SETTINGS_PAGE}`) {
            return (
                <Button
                    type='text'
                    icon={<ArrowLeftOutlined />}
                    onClick={settingBackHandler}
                    data-test-id='settings-back'
                >
                    Настройки
                </Button>
            );
        } else {
            return (
                <Breadcrumb>
                    {templateLink(Paths.MAIN_PAGE)}
                    {paths.map(printPath)}
                </Breadcrumb>
            );
        }
    };
    return (
        <header>
            <div className={classes['inner-wrapper']}>
                <Row justify={'space-between'} wrap={false}>
                    <Col flex={'auto'}>
                        <Row>{printHeader()}</Row>
                        {pathname === `/${Paths.MAIN_PAGE}` && (
                            <Row style={{ marginTop: '13px' }}>
                                <div className={classes['header-title']}>
                                    <Typography.Title level={1}>
                                        Приветствуем тебя в&nbsp;CleverFit — приложении,
                                        <br /> которое поможет тебе добиться своей мечты!
                                    </Typography.Title>
                                </div>
                            </Row>
                        )}
                    </Col>
                    {pathname !== `/${Paths.SETTINGS_PAGE}` && (
                        <Col className='setting-container'>
                            <Button
                                type='text'
                                icon={<SettingOutlined />}
                                onClick={openSettingPage}
                                data-test-id='header-settings'
                            >
                                Настройки
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>
        </header>
    );
};
