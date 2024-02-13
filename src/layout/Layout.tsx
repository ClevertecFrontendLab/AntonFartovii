import * as React from "react";
import {useState} from "react";
import Sider from "./Sider.tsx";
import Header from "./Header.tsx";
import classes from './layout.module.less';
import Footer from "./Footer.tsx";

const Layout = ({children}: { children: React.ReactNode }) => {
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);

    return (
        <div className="app-wrapper">
            <Sider collapsed={collapsedSider} onCollapsed={setCollapsedSider}></Sider>
            <div className="wrapper">
                <Header/>
                <main className={classes.main}>
                    {children}
                </main>
                <Footer collapsed={collapsedSider}/>
            </div>
        </div>
    );
};

export default Layout;
