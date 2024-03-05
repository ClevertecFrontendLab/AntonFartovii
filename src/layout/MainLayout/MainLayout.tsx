import { useEffect, useState } from 'react';
import { Sider } from './Sider.tsx';
import { Header } from './Header.tsx';
import classes from './layout.module.less';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/Loader/Loader.tsx';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';

export const MainLayout = () => {
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const { loader, setLoader } = useLoader() as ILoader;

    useEffect(() => {
        return () => {
            setLoader(false);
        };
    }, [setLoader]);

    return (
        <>
            <div className={classes['app-wrapper']}>
                <Sider collapsed={collapsedSider} onCollapsed={setCollapsedSider}></Sider>
                <div className={classes['wrapper']}>
                    <Header />
                    <main className={classes.main}>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Loader active={loader} />
        </>
    );
};
