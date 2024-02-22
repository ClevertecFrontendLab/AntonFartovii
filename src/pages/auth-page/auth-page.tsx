import classes from './auth.module.less';
import type {MenuProps} from 'antd';
import {Menu} from "antd";
import logo from '../../assets/svg/logo.svg'
import {createContext, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {Paths} from "../../routes/Paths.ts";

interface AuthMenu {
    current: string;
    setCurrent: (bool: string) => void;
}

export const MenuContext = createContext<Partial<AuthMenu>>({});

export const AuthPage = () => {
    const [current, setCurrent] = useState('');

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
        setCurrent(e.key);
    };

    return (
        <div className={classes["auth-form-inner-wrapper"]}>
            <div className={classes["logo"]}>
                <img src={logo}/>
            </div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal"
                  items={items}/>
            <MenuContext.Provider value={{current, setCurrent}}>
                <Outlet/>
            </MenuContext.Provider>
        </div>
    );
};
