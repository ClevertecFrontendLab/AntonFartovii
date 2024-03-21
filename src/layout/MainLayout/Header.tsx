import { Typography } from 'antd/';
import classes from './layout.module.less';
import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PathNames, Paths } from '../../routes/Paths.ts';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

export const Header = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const paths = pathname.split('/').slice(1);
    const templateLink = (path: string) => (
        <Breadcrumb.Item key={path}>
            <Link to={`/${path}`}>{PathNames[path]}</Link>
        </Breadcrumb.Item>
    );
    const printPath = (path: string) => path !== Paths.MAIN_PAGE && templateLink(path);
    const openSettingPage = () => dispatch(push(Paths.MAIN + Paths.SETTINGS_PAGE));

    return (
        <header>
            <div className={classes['inner-wrapper']}>
                <Breadcrumb>
                    {templateLink(Paths.MAIN_PAGE)}
                    {paths.map(printPath)}
                </Breadcrumb>
                {pathname === `/${Paths.MAIN_PAGE}` && (
                    <div className={classes['header-body']}>
                        <div className={classes['header-title']}>
                            <Typography.Title level={1}>
                                Приветствуем тебя в&nbsp;CleverFit — приложении,
                                <br /> которое поможет тебе добиться своей мечты!
                            </Typography.Title>
                        </div>
                        <div className={classes['header-setting']}>
                            <div className={classes['wrap-extra']}>
                                <Button
                                    type='text'
                                    icon={<SettingOutlined />}
                                    onClick={openSettingPage}
                                    data-test-id='header-settings'
                                >
                                    Настройки
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
