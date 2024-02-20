import classes from "./authLayout.module.less";
import {Outlet} from "react-router-dom";
import {useLoader} from "@hooks/useLoader.ts";
import Loader from "@components/Loader.tsx";

const AuthLayout = () => {
    const {loader} = useLoader();

    return (
        <div className={classes["auth-wrapper"]}>
            <div className={classes["auth-container"]}>
                <Outlet/>
            </div>
            <div
                className={loader ? [classes["auth-wrapper-blur"], classes["active"]].join(' ') : classes["auth-wrapper-blur"]}></div>
            {loader && <Loader/>}
        </div>
    );
};

export default AuthLayout;
