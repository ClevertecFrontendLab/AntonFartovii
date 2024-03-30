import React from 'react';
import classes from './404.module.less';
import { Button, Result } from 'antd';
import { Paths } from '../../routes/Paths.ts';
import { Link } from 'react-router-dom';

export const Page404 = () => (
    <div className={classes['page404-container']}>
        <div className={classes['page404-wrap']}>
            <Result
                status='404'
                title='Такой страницы нет'
                subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                extra={
                    <Link to={`/${Paths.MAIN_PAGE}`}>
                        <Button type='primary'>На главную</Button>
                    </Link>
                }
            />
        </div>
    </div>
);
