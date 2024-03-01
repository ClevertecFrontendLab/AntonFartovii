import {useEffect, useState} from "react";
import Sider from "./Sider.tsx";
import Header from "./Header.tsx";
import classes from './layout.module.less';
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import Loader from "@components/Loader.tsx";
import {useLoader} from "@hooks/useLoader.ts";

const MainLayout = () => {
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const {loader, setLoader} = useLoader();

    useEffect(() => {
        return () => {
            setLoader && setLoader(false);
        }
    }, []);

    return (
        <>
            <div className="app-wrapper">
                <Sider collapsed={collapsedSider} onCollapsed={setCollapsedSider}></Sider>
                <div className="wrapper">
                    <Header/>
                    <main className={classes.main}>
                        <Outlet/>
                    </main>
                    <Footer/>
                </div>
            </div>
            <Loader active={loader}/>
        </>
    );
};

export default MainLayout;
