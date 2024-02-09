import {Typography} from 'antd/';
import classes from './layout.module.less';
import {SettingOutlined} from '@ant-design/icons';
import {Breadcrumb} from 'antd';

const Header = () => {
    return (
        <header>
            <div className="inner-wrapper">
                <Breadcrumb>Главная</Breadcrumb>
                <div className={classes["header-body"]}>
                    <div className={classes["header-title"]}>
                        <Typography.Title level={1}>
                            Приветствуем тебя в CleverFit — приложении, которое поможет тебе
                            добиться
                            своей мечты!
                        </Typography.Title>
                    </div>
                    <div className={classes["header-extra"]}>
                        <div className={classes["wrap-extra"]}>
                            <SettingOutlined/>
                            <span>Настройки</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
