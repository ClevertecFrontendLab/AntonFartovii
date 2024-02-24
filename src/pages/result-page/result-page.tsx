import {Outlet} from "react-router-dom";
import classes from "./result.module.less";

export const ResultPage = () => {
    return (
        <div className={classes["result-container"]}>
            <Outlet/>
        </div>
    );
};
