import {ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import classes from "../layout/AuthLayout/authLayout.module.less";

const PrivateResult = ({children}: { children: ReactNode }) => {
    const location = useLocation();
    console.log('PrivateResult:', location);

    if (location.state.key !== 'result_redirect') {
        return <Navigate to='/auth' state={{from: location}}/>
    }

    return (<div className={classes["result-container"]}>{children}</div>);
};

export default PrivateResult;
