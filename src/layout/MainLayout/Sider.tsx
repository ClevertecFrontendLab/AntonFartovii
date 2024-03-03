import exit_icon from '../../assets/svg/exit_icon.svg';
import switcher from '../../assets/svg/switcher.svg';
import switcher_mobile from '../../assets/svg/switcher_mobile.svg';
import classes from './layout.module.less';
import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyTwoTone
} from '@ant-design/icons';
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {setLogout} from "@redux/authSlice.ts";
import {push} from "redux-first-history";
import type {MenuProps} from 'antd';
import {Layout, Menu} from "antd";
import Logo from "@components/Logo.tsx";
import {useWindowSize} from "@uidotdev/usehooks";
import {Key, ReactNode} from "react";

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


const Sider = ({collapsed, onCollapsed}: ISider) => {
    const dispatch = useAppDispatch();
    const size = useWindowSize();

    const logoutHandler = async () => {
        dispatch(setLogout());
        dispatch(push('/auth'));
    };


    const items: MenuItem[] = [
        getItem('Календарь', '1', size.width! > 800 && <CalendarTwoTone/>),
        getItem('Тренировки', '2', size.width! > 800 && <TrophyTwoTone/>),
        getItem('Достижения', '3', size.width! > 800 && <HeartTwoTone/>),
        getItem('Профиль', '4', size.width! > 800 && <IdcardOutlined/>),
    ]

    return (
        <Layout.Sider theme={"light"} className={classes.sider}
                      width={size.width! > 800 ? 208 : 106}
                      collapsedWidth={size.width! > 800 ? 64 : 1}
                      collapsible collapsed={collapsed}
                      onCollapse={onCollapsed}
                      trigger={null}>
            <Logo collapsed={collapsed}/>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}
                  inlineIndent={size.width! > 800 ? 17 : 8}/>
            <div style={{flex: 1}}></div>
            <div className={classes.logout}>
                <a onClick={logoutHandler}>
                    <img className={classes["logout-icon"]} src={exit_icon}/>
                    {!collapsed && <span className={classes["logout-title"]}>Выход</span>}
                </a>
            </div>
            <div className={classes.switcher} onClick={() => onCollapsed(!collapsed)}
                 data-test-id="sider-switch">
                <img className={classes.trapezoid} src={switcher}/>
                {!collapsed ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
            <div className={classes["switcher-mobile"]} onClick={() => onCollapsed(!collapsed)}
                 data-test-id="sider-switch-mobile">
                <img className={classes.trapezoid} src={switcher_mobile}/>
                {!collapsed ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
        </Layout.Sider>
    );
};

export default Sider;
