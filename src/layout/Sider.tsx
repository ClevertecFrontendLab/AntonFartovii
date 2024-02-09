import logo from '../assets/svg/logo.svg';
import exit_icon from '../assets/svg/exit_icon.svg';
import classes from './layout.module.css';
import {
    CalendarOutlined,
    HeartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    TrophyOutlined,
} from '@ant-design/icons';

const Sider = () => {
    return (
        <div className={classes.sider}>
            <div className={classes.logo}>
                <img src={logo}/>
            </div>
            <div className={classes.menu}>
                <div className={classes["menu-link"]}>
                    <div className={classes["link-icon"]}><CalendarOutlined/></div>
                    <div className={classes["link-title"]}>Календарь</div>
                </div>

                <div className={classes["menu-link"]}>
                    <div className={classes["link-icon"]}><HeartOutlined/></div>
                    <div className={classes["link-title"]}>Тренировки</div>
                </div>

                <div className={classes["menu-link"]}>
                    <div className={classes["link-icon"]}><TrophyOutlined/></div>
                    <div className={classes["link-title"]}>Достижения</div>
                </div>

                <div className={classes["menu-link"]}>
                    <div className={classes["link-icon"]}><ProfileOutlined/></div>
                    <div className={classes["link-title"]}>Профиль</div>
                </div>
            </div>
            <div className={classes.logout}>
                <div className={classes["logout-icon"]}><img src={exit_icon}/></div>
                <div className={classes["logout-title"]}>Выйти</div>
            </div>
            <div className={classes.switcher}>
                <MenuUnfoldOutlined className={classes["switcher-icon"]}/>
                <MenuFoldOutlined hidden/>
            </div>
        </div>
    );
};

export default Sider;
