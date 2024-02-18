import classes from "./authLayout.module.less";
import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className={classes["auth-wrapper"]}>
            <div className={classes["auth-form-container"]}>
                <Outlet/>
            </div>
            <div className={classes["auth-wrapper-blur"]}></div>
        </div>
    );
};

export default AuthLayout;
