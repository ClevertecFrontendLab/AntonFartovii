import {ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";

const PrivateResult = ({children}: { children: ReactNode }) => {
    const location = useLocation();
    const isTrue = true;
    if (isTrue) {
        return <Navigate to='/auth' state={{from: location}}/>
    }

    return children;
};

export default PrivateResult;
