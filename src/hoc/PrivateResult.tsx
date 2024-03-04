import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateResult = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    if (location.state?.key !== 'result_redirect') {
        return <Navigate to='/auth' state={{ from: location }} />;
    }

    return children;
};
