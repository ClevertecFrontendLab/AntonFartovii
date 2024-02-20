import {ReactNode} from 'react';
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {Navigate, useLocation} from "react-router-dom";

const PrivateMain = ({children}: { children: ReactNode }) => {
    const {isAuth} = useAppSelector((state) => state.authReducer);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to='/auth' state={{from: location}}/>
    }
    return children;
};

export default PrivateMain;
