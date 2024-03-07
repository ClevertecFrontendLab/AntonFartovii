import { useContext } from 'react';
import { MainContext } from '../layout/MainLayout/MainLayout.tsx';

export function useMainContext() {
    return useContext(MainContext);
}
