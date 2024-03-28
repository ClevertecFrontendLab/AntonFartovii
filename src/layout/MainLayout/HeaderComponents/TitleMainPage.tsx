import classes from '../layout.module.less';
import { Typography } from 'antd';

export const TitleMainPage = () => (
    <div className={classes['header-title']}>
        <Typography.Title level={1}>
            Приветствуем тебя в&nbsp;CleverFit — приложении,
            <br /> которое поможет тебе добиться своей мечты!
        </Typography.Title>
    </div>
);
