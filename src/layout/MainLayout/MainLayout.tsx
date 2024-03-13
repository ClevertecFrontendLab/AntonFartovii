import { createContext, useState } from 'react';
import { Sider } from './Sider.tsx';
import { Header } from './Header.tsx';
import classes from './layout.module.less';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/Loader/Loader.tsx';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';

export type MainContextType = {
    modal500: boolean;
    setModal500: (boo: boolean) => void;
    modalTraining: boolean;
    setModalTraining: (boo: boolean) => void;
    modalExercise: boolean;
    setModalExercise: (boo: boolean) => void;
    drawerExercise: boolean;
    setDrawerExercise: (boo: boolean) => void;
    coords: DOMRect | null;
    setCoords: (coords: DOMRect | null) => void;
};

export const MainContext = createContext<Partial<MainContextType>>({});

export const MainLayout = () => {
    const [modal500, setModal500] = useState<boolean>(false);
    const [modalTraining, setModalTraining] = useState<boolean>(false);
    const [modalExercise, setModalExercise] = useState<boolean>(false);
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const [drawerExercise, setDrawerExercise] = useState<boolean>(false);
    const [coords, setCoords] = useState<DOMRect | null>(null);
    const { loader } = useLoader() as ILoader;

    return (
        <MainContext.Provider
            value={{
                modalTraining,
                setModalTraining,
                modalExercise,
                setModalExercise,
                drawerExercise,
                setDrawerExercise,
                coords,
                setCoords,
                modal500,
                setModal500,
            }}
        >
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
        </MainContext.Provider>
    );
};
