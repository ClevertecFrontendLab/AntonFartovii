import * as React from "react";
import Sider from "./Sider.tsx";
import Header from "./Header.tsx";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Sider></Sider>
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <div className="inner-wrapper">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
