import React, { useEffect } from 'react';
import classes from './main.module.less';
import { Typography } from 'antd/';
import {
    AndroidFilled,
    AppleFilled,
    CalendarTwoTone,
    HeartTwoTone,
    IdcardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes/Paths.ts';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../../layout/MainLayout/MainLayout.tsx';
import { Modal500 } from '@components/Calendar/Modal500.tsx';
import { useLazyGetTrainingQuery } from '@redux/api/trainingApi.ts';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { push } from 'redux-first-history';

export const MainPage: React.FC = () => {
    const { setModal500 } = useMainContext() as MainContextType;
    const { setLoader } = useLoader() as ILoader;
    const [query, queryState] = useLazyGetTrainingQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoader(queryState.isLoading);
    }, [queryState.isLoading, setLoader]);

    useEffect(() => {
        queryState.isError && setModal500(true);
    }, [queryState.isError, setModal500]);

    useEffect(() => {
        queryState.isSuccess && dispatch(push('/calendar-page'));
    }, [queryState.isSuccess, dispatch]);

    return (
        <>
            <section className={classes['main-container']}>
                <div className={classes['description-container']}>
                    <Typography.Text className={classes['description-text']}>
                        С CleverFit ты сможешь:
                        <br />
                        — планировать свои тренировки на&nbsp;календаре, выбирая тип и&nbsp;уровень
                        нагрузки;
                        <br />
                        — отслеживать свои достижения в&nbsp;разделе статистики, сравнивая свои
                        результаты с нормами и&nbsp;рекордами;
                        <br />
                        — создавать свой профиль, где ты&nbsp;можешь загружать свои фото, видео и
                        отзывы о&nbsp;тренировках;
                        <br />— выполнять расписанные тренировки для разных частей тела, следуя
                        подробным инструкциям и&nbsp;советам профессиональных тренеров.
                    </Typography.Text>
                </div>
                <div className={classes['content-container']}>
                    <div className={classes['content-text']}>
                        <Typography.Title level={4}>
                            CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </Typography.Title>
                    </div>
                    <div className={classes.card}>
                        <div className={classes['card-title']}>
                            <a>Расписать тренировки</a>
                        </div>
                        <div className={classes['card-button']}>
                            <a>
                                <HeartTwoTone className={classes['card-icon']} />
                                <span>Тренировки</span>
                            </a>
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes['card-title']}>
                            <a>Назначить календарь</a>
                        </div>
                        <div className={classes['card-button']}>
                            <a onClick={() => query()} data-test-id='menu-button-calendar-page'>
                                <CalendarTwoTone className={classes['card-icon']} />
                                <span>Календарь</span>
                            </a>
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes['card-title']}>
                            <a>Заполнить профиль</a>
                        </div>
                        <div className={classes['card-button']}>
                            <a>
                                <IdcardOutlined className={classes['card-icon']} />
                                <span>Профиль</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={classes['main-footer']}>
                    <div className={classes['footer-container']}>
                        <div className={classes['left']}>
                            <Link to={Paths.MAIN + Paths.FEEDBACKS} data-test-id='see-reviews'>
                                Смотреть отзывы
                            </Link>
                        </div>
                        <div className={classes['right']}>
                            <div className={classes['top']}>
                                <div className={classes['download-link']}>
                                    <a>Скачать на телефон</a>
                                </div>
                                <div className={classes['notification']}>Доступно в PRO-тарифе</div>
                            </div>
                            <div className={classes['bottom']}>
                                <div>
                                    <a>
                                        <AndroidFilled />
                                        Android OS
                                    </a>
                                </div>
                                <div>
                                    <a>
                                        <AppleFilled />
                                        Apple iOS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal500 />
        </>
    );
};
