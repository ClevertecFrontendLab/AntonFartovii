import {Typography} from 'antd/';
import classes from './layout.module.less';
import {SettingOutlined} from '@ant-design/icons';
import {Breadcrumb} from 'antd';

const Header = () => {
    return (
        <header>
            <div className="inner-wrapper">
                <Breadcrumb><a href="/">Главная</a></Breadcrumb>
                <div className={classes["header-body"]}>
                    <div className={classes["header-title"]}>
                        <Typography.Title level={1}>
                            Приветствуем тебя в&nbsp;CleverFit — приложении,<br/> которое поможет
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
            </div>
        </header>
    );
};

export default Header;
