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
                {isSwitch && <div className={classes["logout-title"]}>Выход</div>}
            </div>
            <div className={classes.switcher} onClick={switchHandler} data-test-id="sider-switch">
                <img className={classes.trapezoid} src={switcher}/>
                {isSwitch ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
            <div className={classes["switcher-mobile"]} onClick={switchHandler}
                 data-test-id="sider-switch-mobile">
                <img className={classes.trapezoid} src={switcher_mobile}/>
                {isSwitch ? <MenuUnfoldOutlined className={classes["switcher-icon"]}/> :
                    <MenuFoldOutlined className={classes["switcher-icon"]}/>
                }
            </div>
        </div>
    );
};

export default Sider;
