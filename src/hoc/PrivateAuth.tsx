import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {Navigate, useLocation} from "react-router-dom";
import {ReactNode} from "react";

const PrivateAuth = ({children}: { children: ReactNode }) => {
    const {isAuth} = useAppSelector((state) => state.authReducer);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to='/main' state={{from: location}}/>
    }
    return children;
};

export default PrivateAuth;
