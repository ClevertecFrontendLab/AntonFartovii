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
import {Layout, Menu} from "antd";
import Logo from "@components/Logo.tsx";
import {useWindowSize} from "@uidotdev/usehooks";

export interface ISider {
    collapsed: boolean;
    onCollapsed: (bool: boolean) => void;
}

const Sider = ({collapsed, onCollapsed}: ISider) => {
    const dispatch = useAppDispatch();
    const size = useWindowSize();

    const logoutHandler = async () => {
        dispatch(setLogout());
        dispatch(push('/auth'));
    };

    return (
        <Layout.Sider theme={"light"} className={classes.sider}
                      width={size.width! > 800 ? 208 : 106}
                      collapsedWidth={size.width! > 800 ? 64 : 1}
                      collapsible collapsed={collapsed}
                      onCollapse={onCollapsed}
                      trigger={null}>
            <Logo collapsed={collapsed}/>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"
                  className={classes.menu} inlineIndent={17}>
                <Menu.Item key="1" icon={size.width! > 800 && <CalendarTwoTone/>}>
                    <span>Календарь</span>
                </Menu.Item>
                <Menu.Item key="3" icon={size.width! > 800 && <TrophyTwoTone/>}>
                    <span>Тренировки</span>
                </Menu.Item>
                <Menu.Item key="2" icon={size.width! > 800 && <HeartTwoTone/>}>
                    <span>Достижения</span>
                </Menu.Item>
                <Menu.Item key="4" icon={size.width! > 800 && <IdcardOutlined/>}>
                    <span>Профиль</span>
                </Menu.Item>
            </Menu>
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
