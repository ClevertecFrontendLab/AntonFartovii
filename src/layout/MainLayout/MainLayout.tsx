import { createContext, useEffect, useState } from 'react';
import { Sider } from './Sider.tsx';
import { Header } from './Header.tsx';
import classes from './layout.module.less';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/Loader/Loader.tsx';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';
import { useGetTrainingQuery } from '@redux/api/trainingApi.ts';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/Paths.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useLazyGetTrainingListQuery } from '@redux/api/catalogsApi.ts';

export type MainContextType = {
    skip: boolean;
    setSkip: (boo: boolean) => void;
    modalErrorInfo: boolean;
    setModalErrorInfo: (boo: boolean) => void;
    modal500: boolean;
    setModal500: (boo: boolean) => void;
    modalTraining: boolean;
    setModalTraining: (boo: boolean) => void;
    modalExercise: boolean;
    setModalExercise: (boo: boolean) => void;
    drawerExercise: boolean;
    setDrawerExercise: (boo: boolean) => void;
    refetchTraining: boolean;
    setRefetchTraining: (boo: boolean) => void;
    refetch: boolean;
    setRefetch: (boo: boolean) => void;
    coords: DOMRect | null;
    setCoords: (coords: DOMRect | null) => void;
};

export const MainContext = createContext<Partial<MainContextType>>({});

export const MainLayout = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [modal500, setModal500] = useState<boolean>(false);
    const [refetchTraining, setRefetchTraining] = useState<boolean>(false);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [modalErrorInfo, setModalErrorInfo] = useState<boolean>(false);
    const [modalTraining, setModalTraining] = useState<boolean>(false);
    const [modalExercise, setModalExercise] = useState<boolean>(false);
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const [drawerExercise, setDrawerExercise] = useState<boolean>(false);
    const [coords, setCoords] = useState<DOMRect | null>(null);
    const { loader, setLoader } = useLoader() as ILoader;
    const trainingQuery = useGetTrainingQuery(undefined, { skip });
    const [fetchTrainingList, fetchState] = useLazyGetTrainingListQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            setLoader(false);
        };
    }, [setLoader]);

    useEffect(() => {
        setLoader(trainingQuery.isLoading);
    }, [trainingQuery.isLoading, setLoader]);

    useEffect(() => {
        if (trainingQuery.isError) {
            setModal500(true);
        }
    }, [trainingQuery.isError]);

    useEffect(() => {
        if (trainingQuery.isSuccess || trainingQuery.data) {
            fetchTrainingList();
        }
    }, [trainingQuery.isSuccess, trainingQuery.data]);

    useEffect(() => {
        if (refetch) {
            fetchTrainingList();
        }
    }, [refetch]);

    // useEffect(() => {
    //     fetchState.isLoading && setLoader(fetchState.isLoading);
    // }, [fetchState.isLoading, setLoader]);

    useEffect(() => {
        if (fetchState.isError) {
            setModalErrorInfo(true);
            dispatch(push(Paths.MAIN + Paths.CALENDAR_PAGE));
        }
    }, [fetchState.isError, setModalErrorInfo, dispatch]);

    useEffect(() => {
        if (fetchState.isSuccess) {
            dispatch(push(Paths.MAIN + Paths.CALENDAR_PAGE));
        }
    }, [fetchState.isSuccess, dispatch]);

    return (
        <MainContext.Provider
            value={{
                skip,
                setSkip,
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
                modalErrorInfo,
                setModalErrorInfo,
                refetch,
                setRefetch,
                refetchTraining,
                setRefetchTraining,
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
