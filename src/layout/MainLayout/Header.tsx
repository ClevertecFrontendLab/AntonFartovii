import {Typography} from 'antd/';
import classes from './layout.module.less';
import {SettingOutlined} from '@ant-design/icons';
import {Breadcrumb} from 'antd';
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    const {pathname} = useLocation();
    return (
        <header>
            <div className="inner-wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/main'}>Главная</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {pathname === '/main' && (
                    <div className={classes["header-body"]}>
                        <div className={classes["header-title"]}>
                            <Typography.Title level={1}>
                                Приветствуем тебя в&nbsp;CleverFit — приложении,<br/> которое
                                поможет
                                тебе
                                добиться своей мечты!
                            </Typography.Title>
                        </div>
                        <div className={classes["header-setting"]}>
                            <div className={classes["wrap-extra"]}>
                                <div className={classes["setting-icon"]}><SettingOutlined/></div>
                                <div className={classes["setting-title"]}><a>Настройки</a></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
