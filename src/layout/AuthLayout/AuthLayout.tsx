import classes from "@pages/auth-page/auth.module.less";
import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className={classes["auth-wrapper"]}>
            <div className={classes["auth-form-container"]}>
                <div className={classes["auth-wrapper"]}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
