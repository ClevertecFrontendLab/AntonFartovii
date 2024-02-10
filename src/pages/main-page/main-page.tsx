import React from 'react';
import classes from './main.module.less';
import {Typography} from "antd/";
import {
    AndroidFilled,
    AppleFilled,
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined
} from '@ant-design/icons';

export const MainPage: React.FC = () => {

    return (
        <section className={classes["main-container"]}>
            <div className={classes["description-container"]}>
                <Typography.Text className={classes["description-text"]}>
                    С CleverFit ты сможешь:<br/>
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                    нормами и рекордами;<br/>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                    тренировках;<br/>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам профессиональных тренеров.
                </Typography.Text>
            </div>
            <div className={classes["content-container"]}>
                <div className={classes["content-text"]}>
                    <Typography.Title level={4}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Typography.Title>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        Расписать тренировки
                    </div>
                    <div className={classes["card-button"]}>
                        <HeartTwoTone className={classes["card-icon"]}/>
                        <span>Тренировки</span>
                    </div>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        Назначить календарь
                    </div>
                    <div className={classes["card-button"]}>
                        <CalendarTwoTone className={classes["card-icon"]}/>
                        <span>Календарь</span>
                    </div>
                </div>
                <div className={classes.card}>
                    <div className={classes["card-title"]}>
                        Заполнить профиль
                    </div>
                    <div className={classes["card-button"]}>
                        <IdcardOutlined className={classes["card-icon"]}/>
                        <span>Профиль</span>
                    </div>
                </div>
            </div>
            <div className={classes["footer-container"]}>
                <div className={classes["left"]}>Смотреть отзывы</div>
                <div className={classes["right"]}>
                    <div className={classes["top"]}>
                        <div className={classes["download-link"]}>Скачать на телефон</div>
                        <div className={classes["notification"]}>Доступно в PRO-тарифе</div>
                    </div>
                    <div className={classes["bottom"]}>
                        <div><AndroidFilled/>Android OS</div>
                        <div><AppleFilled/>Apple iOS</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
