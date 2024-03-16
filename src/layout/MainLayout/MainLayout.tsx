import { createContext, useState } from 'react';
import { Sider } from './Sider.tsx';
import { Header } from './Header.tsx';
import classes from './layout.module.less';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/Loader/Loader.tsx';
import { useLoader } from '@hooks/useLoader.ts';
import { ILoader } from '../../hoc/LoaderProvider.tsx';
import { UserCalendar } from '@redux/calendarSlice.ts';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';

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
    const [editMode, setEditMode] = useState<boolean>(false);
    const [coords, setCoords] = useState<DOMRect | null>(null);
    const [date, setDate] = useState<Date>();
    const [calendar, setCalendar] = useState<UserCalendar>({});
    const { loader } = useLoader() as ILoader;

    return (
        <ConfigProvider locale={ruRu}>
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
        </ConfigProvider>
    );
};
