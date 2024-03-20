import { createContext, RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { Sider } from './Sider.tsx';
import { Header } from './Header.tsx';
import classes from './layout.module.less';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/Loader/Loader.tsx';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';
import { UserCalendar } from '@redux/calendarSlice.ts';
import { formatCalendar } from '../../utils.ts';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/Paths.ts';
import { useLazyGetTrainingQuery } from '@redux/api/trainingApi.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useGetUserQuery } from '@redux/api/userApi.ts';
import { setUser } from '@redux/userSlice.ts';

export type MainContextType = {
    modal500: boolean;
    setModal500: (bool: boolean) => void;
    modalTraining: boolean;
    setModalTraining: (bool: boolean) => void;
    modalExercise: boolean;
    setModalExercise: (bool: boolean) => void;
    modalErrorSave: boolean;
    setModalErrorSave: (bool: boolean) => void;
    drawerExercise: boolean;
    setDrawerExercise: (bool: boolean) => void;
    coords: DOMRect | null;
    setCoords: (coords: DOMRect | null) => void;
    calendar: UserCalendar;
    setCalendar: (calendar: UserCalendar) => void;
    date: Date;
    setDate: (date: Date) => void;
    editMode: boolean;
    setEditMode: (bool: boolean) => void;
    changeForm: boolean;
    setChangeForm: (bool: boolean) => void;
    collapsedSider: boolean;
    setCollapsedSider: (bool: boolean) => void;
    cellRef: RefObject<HTMLDivElement>;
    setCellRef: (ref: RefObject<HTMLDivElement>) => void;
    refetchUserCalendar: boolean;
    setRefetchUserCalendar: (bool: boolean) => void;
};

export const MainContext = createContext<Partial<MainContextType>>({});

export const MainLayout = () => {
    const [modal500, setModal500] = useState<boolean>(false);
    const [modalTraining, setModalTraining] = useState<boolean>(false);
    const [modalExercise, setModalExercise] = useState<boolean>(false);
    const [modalErrorSave, setModalErrorSave] = useState<boolean>(false);
    const [changeForm, setChangeForm] = useState<boolean>(false);
    const [collapsedSider, setCollapsedSider] = useState<boolean>(false);
    const [drawerExercise, setDrawerExercise] = useState<boolean>(false);
    const [refetchUserCalendar, setRefetchUserCalendar] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [coords, setCoords] = useState<DOMRect | null>(null);
    const [date, setDate] = useState<Date>();
    const [calendar, setCalendar] = useState<UserCalendar>({});
    const [cellRef, setCellRef] = useState<RefObject<HTMLDivElement>>();
    const { loader, setLoader } = useLoader() as ILoader;
    const [queryUserCalendar, queryUserCalendarState] = useLazyGetTrainingQuery();
    const queryUser = useGetUserQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        queryUser.data && dispatch(setUser(queryUser.data));
    }, [queryUser.data, dispatch]);

    useLayoutEffect(() => {
        refetchUserCalendar && queryUserCalendar();
        return () => {
            setRefetchUserCalendar(false);
        };
    }, [refetchUserCalendar, queryUserCalendar]);

    useEffect(() => {
        setLoader(queryUserCalendarState.isLoading);
    }, [queryUserCalendarState.isLoading, queryUserCalendarState.isFetching, setLoader]);

    useEffect(() => {
        queryUserCalendarState.isError && setModal500(true);
    }, [queryUserCalendarState.isError, queryUserCalendarState.isFetching, setModal500]);

    useEffect(() => {
        if (queryUserCalendarState.isSuccess) {
            const calendar =
                queryUserCalendarState.data && formatCalendar(queryUserCalendarState.data);
            calendar && setCalendar(calendar);
            dispatch(push(Paths.MAIN + Paths.CALENDAR_PAGE));
        }
    }, [
        queryUserCalendarState.isSuccess,
        queryUserCalendarState.isFetching,
        queryUserCalendarState.data,
        setCalendar,
        dispatch,
    ]);

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
                calendar,
                setCalendar,
                date,
                setDate,
                modalErrorSave,
                setModalErrorSave,
                editMode,
                setEditMode,
                changeForm,
                setChangeForm,
                collapsedSider,
                setCollapsedSider,
                cellRef,
                setCellRef,
                setRefetchUserCalendar,
            }}
        >
            <div className={classes['app-wrapper']}>
                <Sider />
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
