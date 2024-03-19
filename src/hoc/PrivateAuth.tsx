import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Paths } from '../routes/Paths.ts';

export const PrivateAuth = ({ children }: { children: ReactNode }) => {
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to={Paths.MAIN + Paths.MAIN_PAGE} state={{ from: location }} />;
    }
    return children;
};
