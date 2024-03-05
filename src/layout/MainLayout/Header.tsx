import { Typography } from 'antd/';
import classes from './layout.module.less';
import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PathNames, Paths } from '../../routes/Paths.ts';

export const Header = () => {
    const { pathname } = useLocation();
    const paths = pathname.split('/').slice(1);
    const templateLink = (path: string) => (
        <Breadcrumb.Item key={path}>
            <Link to={`/${path}`}>{PathNames[path]}</Link>
        </Breadcrumb.Item>
    );
    const printPath = (path: string) => path !== Paths.MAIN_PAGE && templateLink(path);

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
                                <div className={classes['setting-icon']}>
                                    <SettingOutlined />
                                </div>
                                <div className={classes['setting-title']}>
                                    <a>Настройки</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
