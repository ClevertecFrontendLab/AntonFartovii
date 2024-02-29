import classes from "./authLayout.module.less";
import {Outlet} from "react-router-dom";
import {useLoader} from "@hooks/useLoader.ts";
import Loader from "@components/Loader.tsx";
import {useEffect} from "react";

const AuthLayout = () => {
    const {loader, setLoader} = useLoader();

    useEffect(() => {
        return () => {
            setLoader && setLoader(false);
        }
    }, []);

    return (
        <div className={classes["auth-wrapper"]}>
            <div className={classes["auth-container"]}>
                <Outlet/>
            </div>
            <Loader active={loader}/>
        </div>
    );
};

export default AuthLayout;
