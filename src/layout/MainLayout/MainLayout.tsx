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
import { useFeedbackModal } from '@hooks/useFeedbackModal.ts';

export type MainContextType = {
    skip: boolean;
    setSkip: (boo: boolean) => void;
    trainingQuery: ReturnType<typeof useGetTrainingQuery>;
};

export const MainContext = createContext<Partial<MainContextType>>({});

export const MainLayout = () => {
    const [skip, setSkip] = useState<boolean>(true);
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const { loader, setLoader } = useLoader() as ILoader;
    const { setModalError500 } = useFeedbackModal();
    const trainingQuery = useGetTrainingQuery(undefined, { skip });
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
            setModalError500(true);
            setSkip(true);
        }
    }, [trainingQuery.isError, setSkip, setModalError500]);

    useEffect(() => {
        if (trainingQuery.isSuccess) {
            setSkip(true);
            dispatch(push(Paths.MAIN + Paths.CALENDAR_PAGE));
        }
    }, [dispatch, trainingQuery.isSuccess]);

    return (
        <MainContext.Provider value={{ skip, setSkip, trainingQuery }}>
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
