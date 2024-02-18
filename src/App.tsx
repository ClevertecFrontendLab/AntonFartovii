import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {jwtDecode} from "jwt-decode";
import {setIsAuth} from "@redux/authSlice.ts";
import Router from "./Router.tsx";
import LoaderProvider from "./hoc/LoaderProvider.tsx";

const App = () => {
    const {accessToken} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const decodedToken = accessToken && jwtDecode(accessToken);
        const expirationTime = decodedToken && decodedToken.exp! * 1000;
        const isTokenValid = Date.now() < (expirationTime || 0);
        dispatch(setIsAuth(isTokenValid));
    }, [accessToken]);

    return (
        <LoaderProvider>
            <Router/>
        </LoaderProvider>
    );
};

export default App;
