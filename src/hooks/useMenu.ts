import { useContext } from 'react';
import { MenuContext } from '@pages/auth-page/auth-page.tsx';

export function useMenu() {
    return useContext(MenuContext);
}
