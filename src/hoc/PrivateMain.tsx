import {ReactNode} from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {Navigate, useLocation} from "react-router-dom";
import {setAccessToken, setIsAuth} from "@redux/authSlice.ts";

const PrivateMain = ({children}: { children: ReactNode }) => {
    const {isAuth} = useAppSelector((state) => state.authReducer);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const accessToken = new URLSearchParams(window.location.search).get('accessToken');
    if (accessToken) {
        dispatch(setAccessToken(accessToken));
        dispatch(setIsAuth(true));
    }

    if (!isAuth) {
        return <Navigate to='/auth' state={{from: location}}/>
    }
    return children;
};

export default PrivateMain;
