import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setIsAuth, setLogout } from '@redux/authSlice.ts';
import { LoaderProvider } from './hoc/LoaderProvider.tsx';
import { Router } from './Router.tsx';

export const App = () => {
    const { accessToken, isSaveAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const isTokenValid = !!accessToken;
    dispatch(setIsAuth(isTokenValid));

    useEffect(() => {
        return () => {
            if (!isSaveAuth) {
                dispatch(setLogout());
            }
        };
    }, [dispatch, isSaveAuth]);

    return (
        <LoaderProvider>
            <Router />
        </LoaderProvider>
    );
};
