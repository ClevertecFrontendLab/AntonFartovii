import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {setIsAuth, setLogout} from "@redux/authSlice.ts";
import Router from "./Router.tsx";
import LoaderProvider from "./hoc/LoaderProvider.tsx";

const App = () => {
    const {accessToken, isSaveAuth} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const isTokenValid = !!accessToken;
    dispatch(setIsAuth(isTokenValid));

    useEffect(() => {
        return () => {
            if (!isSaveAuth) {
                dispatch(setLogout());
            }
        }
    }, []);

    return (
        <LoaderProvider>
            <Router/>
        </LoaderProvider>
    );
};

export default App;
