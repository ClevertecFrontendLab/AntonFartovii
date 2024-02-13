import logo from '../assets/svg/logo.svg';
import logo_small from '../assets/svg/logo_mobile.svg';
import exit_icon from '../assets/svg/exit_icon.svg';
import switcher from '../assets/svg/switcher.svg';
import switcher_mobile from '../assets/svg/switcher_mobile.svg';
import classes from './layout.module.less';
import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyTwoTone
} from '@ant-design/icons';

export interface ISider {
    collapsed: boolean;
    onCollapsed: (bool: boolean) => void;
}

const Sider = ({collapsed, onCollapsed}: ISider) => {

    const classOff = (className: string) => className + ' ' + classes["off"];

    return (
        <div className={!collapsed ? classes.sider : classOff(classes.sider)}>
            <div className={classes["sider-nav"]}>
                <div className={classes.logo}>
                    {!collapsed ? <img src={logo}/> :
                        <img className={classes["logo-small"]} src={logo_small}/>
                    }
                </div>
                <div className={classes.menu}>
                    <div className={classes["menu-link"]}>
                        <a>
                            <CalendarTwoTone className={classes["link-icon"]}/>
                            {!collapsed && <span className={classes["link-title"]}>Календарь</span>}
                        </a>
                    </div>

                    <div className={classes["menu-link"]}>
                        <a>
                            <HeartTwoTone className={classes["link-icon"]}/>
                            {!collapsed &&
                                <span className={classes["link-title"]}>Тренировки</span>}
                        </a>
                    </div>

                    <div className={classes["menu-link"]}>
                        <a>
                            <TrophyTwoTone className={classes["link-icon"]}/>
                            {!collapsed &&
                                <span className={classes["link-title"]}>Достижения</span>}
                        </a>
                    </div>

                    <div className={classes["menu-link"]}>
                        <a>
                            <IdcardOutlined className={classes["link-icon"]}/>
                            {!collapsed && <span className={classes["link-title"]}>Профиль</span>}
                        </a>
                    </div>
                </div>
            </div>
            <div className={classes.logout}>
                <a>
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
        </div>
    );
};

export default Sider;
