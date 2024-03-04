import classes from './authLayout.module.less';
import { Outlet } from 'react-router-dom';
import { useLoader } from '@hooks/useLoader.ts';
import { Loader } from '@components/Loader/Loader.tsx';
import { useEffect } from 'react';
import { ILoader } from '../../hoc/LoaderProvider.tsx';

export const AuthLayout = () => {
    const { loader, setLoader } = useLoader() as ILoader;

    useEffect(() => {
        return () => {
            setLoader(false);
        };
    }, []);

    return (
        <div className={classes['auth-wrapper']}>
            <div className={classes['auth-container']}>
                <Outlet />
            </div>
            <Loader active={loader} />
        </div>
    );
};
