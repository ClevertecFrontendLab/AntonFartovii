import React from 'react';
import classes from './main.module.less';
import {Typography} from "antd/";
import {CalendarTwoTone, HeartTwoTone, IdcardOutlined} from '@ant-design/icons';

export const MainPage: React.FC = () => {

    return (
        <section className={classes["main-container"]}>
            <div className={classes["description-container"]}>
                <Typography.Text className={classes["description-text"]}>
                    С CleverFit ты сможешь:<br/>
                    — планировать свои тренировки на&nbsp;календаре, выбирая тип
                    и&nbsp;уровень нагрузки;<br/>
                    — отслеживать свои достижения
                    в&nbsp;разделе статистики, сравнивая
                    свои результаты с нормами
                    и&nbsp;рекордами;<br/>
                    — создавать свой профиль, где
                    ты&nbsp;можешь загружать свои фото,
                    видео и отзывы о&nbsp;тренировках;<br/>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и&nbsp;советам профессиональных тренеров.
                </Typography.Text>
            </div>
            <div className={classes["content-container"]}>
                <div className={classes["content-text"]}>
                    <Typography.Title level={4}>
                        CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                        фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Typography.Title>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        <a>Расписать тренировки</a>
                    </div>
                    <div className={classes["card-button"]}>
                        <a>
                            <HeartTwoTone className={classes["card-icon"]}/>
                            <span>Тренировки</span>
                        </a>
                    </div>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        <a>Назначить календарь</a>
                    </div>
                    <div className={classes["card-button"]}>
                        <a>
                            <CalendarTwoTone className={classes["card-icon"]}/>
                            <span>Календарь</span>
                        </a>
                    </div>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        <a>Заполнить профиль</a>
                    </div>
                    <div className={classes["card-button"]}>
                        <a>
                            <IdcardOutlined className={classes["card-icon"]}/>
                            <span>Профиль</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
