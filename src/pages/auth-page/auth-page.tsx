import classes from './auth.module.less';
import type {MenuProps} from 'antd';
import {Menu} from "antd";
import logo from '../../assets/svg/logo.svg'
import {useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {Paths} from "../../routes/Paths.ts";

export const AuthPage = () => {
    const [current, setCurrent] = useState('login');


    const items: MenuProps['items'] = [
        {
            label: (<Link to={''}>Вход</Link>),
            key: 'login',

        },
        {
            label: (<Link to={Paths.REGISTRATION}>Регистрация</Link>),
            key: 'registration',
        },
    ];


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className={classes["auth-form-container"]}>
            <div className={classes["auth-form-inner-wrapper"]}>
                <div>
                    <img src={logo}/>
                </div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal"
                      items={items}/>
                <Outlet/>
            </div>
        </div>
    );
};
