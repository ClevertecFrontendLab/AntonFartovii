import logo from '../assets/svg/logo.svg';
import logo_small from '../assets/svg/logo_mobile.svg';
import exit_icon from '../assets/svg/exit_icon.svg';
import classes from './layout.module.less';
import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyTwoTone
} from '@ant-design/icons';
import {useState} from "react";

const Sider = () => {
    const [isSwitch, setIsSwitch] = useState<boolean>(true);

    const switchHandler = () => {
        setIsSwitch(!isSwitch);
    };
    const classOff = (className: string) => className + ' ' + classes["off"];

    return (
        <div className={isSwitch ? classes.sider : classOff(classes.sider)}>
            <div className={classes["sider-nav"]}>
                <div className={classes.logo}>
                    {isSwitch ? <img src={logo}/> :
                        <img className={classes["logo-small"]} src={logo_small}/>
                    }
                </div>
                <div className={classes.menu}>
                    <div className={classes["menu-link"]}>
                        <div className={classes["link-icon"]}><CalendarTwoTone/>
                        </div>
                        {isSwitch && <div className={classes["link-title"]}>Календарь</div>}
                    </div>

                    <div className={classes["menu-link"]}>
                        <div className={classes["link-icon"]}><HeartTwoTone/></div>
                        <div className={classes["link-title"]}>Тренировки</div>
                    </div>

                    <div className={classes["menu-link"]}>
                        <div className={classes["link-icon"]}><TrophyTwoTone/></div>
                        <div className={classes["link-title"]}>Достижения</div>
                    </div>

                    <div className={classes["menu-link"]}>
                        <div className={classes["link-icon"]}><IdcardOutlined/></div>
                        <div className={classes["link-title"]}>Профиль</div>
                    </div>
                </div>
            </div>
            <div className={classes.logout}>
                <div className={classes["logout-icon"]}><img src={exit_icon}/></div>
                {isSwitch && <div className={classes["logout-title"]}>Выйти</div>}
            </div>
            <div className={classes.switcher} onClick={switchHandler} data-test-id="sider-switch">
                <svg className={classes.trapezoid} width="20" height="66" viewBox="0 0 20 66"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 -1.52588e-05L20 7.99998V58L0 66V-1.52588e-05Z" fill="white"/>
                </svg>
                {isSwitch ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
            <div className={classes["switcher-mobile"]} onClick={switchHandler}
                 data-test-id="sider-switch-mobile">
                <svg width="32" height="48" viewBox="0 0 32 48" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L32 5.81818V42.1818L0 48V0Z" fill="white"/>
                </svg>
                {isSwitch ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
        </div>
    );
};

export default Sider;
