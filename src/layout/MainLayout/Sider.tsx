import exit_icon from '@assets/svg/exit_icon.svg';
import switcher from '@assets/svg/switcher.svg';
import switcher_mobile from '@assets/svg/switcher_mobile.svg';
import classes from './layout.module.less';
import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyTwoTone,
} from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setLogout } from '@redux/authSlice.ts';
import { push } from 'redux-first-history';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Logo } from '@components/Logo.tsx';
import { useWindowSize } from '@uidotdev/usehooks';
import { Key, ReactNode, useEffect, useState } from 'react';
import { Paths } from '../../routes/Paths.ts';
import { Link, useLocation } from 'react-router-dom';
import { MainContextType } from './MainLayout.tsx';
import { useMainContext } from '@hooks/useMainContext.ts';

type MenuItem = Required<MenuProps>['items'][number];

export interface ISider {
    collapsed: boolean;
    onCollapsed: (bool: boolean) => void;
}

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const Sider = () => {
    const [pathKey, setPathKey] = useState<string>('');
    const dispatch = useAppDispatch();
    const size = useWindowSize();
    const location = useLocation();
    const { setRefetchUserCalendar, collapsedSider, setCollapsedSider } =
        useMainContext() as MainContextType;

    useEffect(() => {
        const pathName = location.pathname.split('/')[1];
        setPathKey(pathName);
    }, [setPathKey, location]);

    const logoutHandler = async () => {
        dispatch(setLogout());
        dispatch(push(Paths.MAIN + Paths.AUTH));
    };

    const openCalendar = () => setRefetchUserCalendar(true);

    const items: MenuItem[] = [
        getItem(
            <a onClick={openCalendar}>Календарь</a>,
            Paths.CALENDAR_PAGE,
            size.width && size.width > 800 && <CalendarTwoTone />,
        ),
        getItem('Тренировки', 'trainings', size.width && size.width > 800 && <TrophyTwoTone />),
        getItem('Достижения', '3', size.width && size.width > 800 && <HeartTwoTone />),
        getItem(
            <Link to={Paths.MAIN + Paths.PROFILE_PAGE}>Профиль</Link>,
            Paths.PROFILE_PAGE,
            size.width && size.width > 800 && <IdcardOutlined />,
        ),
    ];

    const switchSider = () => setCollapsedSider(!collapsedSider);

    return (
        <Layout.Sider
            theme={'light'}
            className={classes.sider}
            width={size.width && size.width > 800 ? 208 : 106}
            collapsedWidth={size.width && size.width > 800 ? 64 : 1}
            collapsible
            collapsed={collapsedSider}
            onCollapse={switchSider}
            trigger={null}
        >
            <Logo collapsed={collapsedSider} />
            <Menu
                theme='light'
                selectedKeys={[pathKey]}
                mode='inline'
                items={items}
                inlineIndent={size.width && size.width > 800 ? 17 : 8}
            />
            <div style={{ flex: 1 }}></div>
            <div className={classes.logout}>
                <a onClick={logoutHandler}>
                    <img className={classes['logout-icon']} src={exit_icon} alt='logout icon' />
                    {!collapsedSider && <span className={classes['logout-title']}>Выход</span>}
                </a>
            </div>
            <div className={classes.switcher} onClick={switchSider} data-test-id='sider-switch'>
                <img className={classes.trapezoid} src={switcher} alt='switcher icon' />
                {!collapsedSider ? (
                    <MenuUnfoldOutlined className={classes['switcher-icon']} />
                ) : (
                    <MenuFoldOutlined className={classes['switcher-icon']} />
                )}
            </div>
            <div
                className={classes['switcher-mobile']}
                onClick={switchSider}
                data-test-id='sider-switch-mobile'
            >
                <img className={classes.trapezoid} src={switcher_mobile} alt='switcher icon' />
                {!collapsedSider ? (
                    <MenuUnfoldOutlined className={classes['switcher-icon']} />
                ) : (
                    <MenuFoldOutlined className={classes['switcher-icon']} />
                )}
            </div>
        </Layout.Sider>
    );
};
