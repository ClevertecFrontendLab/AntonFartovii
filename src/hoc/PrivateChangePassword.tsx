import {ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";

const PrivateChangePassword = ({children}: { children: ReactNode }) => {
    const location = useLocation();

    if (location.state?.key == 'result_redirect' || location.state?.key == 'resend') {
        return children;
    }
    return <Navigate to='/auth' state={{from: location}}/>

};

export default PrivateChangePassword;
