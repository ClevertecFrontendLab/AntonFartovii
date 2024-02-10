import * as React from "react";
import Sider from "./Sider.tsx";
import Header from "./Header.tsx";
import classes from './layout.module.less';

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="app-wrapper">
            <Sider></Sider>
            <div className="wrapper">
                <Header/>
                <div className={classes.main}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
