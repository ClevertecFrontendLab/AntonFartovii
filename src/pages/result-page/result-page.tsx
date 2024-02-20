import {Outlet} from "react-router-dom";
import classes from "./result.module.less";

export const ResultPage = () => {
    return (
        <div className={classes["result-container"]}>
            <div className={classes["result-inner-wrapper"]}>
                <Outlet/>
            </div>
        </div>
    );
};
