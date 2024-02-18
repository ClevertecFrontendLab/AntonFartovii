import {useContext} from 'react';
import {LoadingContext} from "../hoc/LoaderProvider.tsx";

export function useLoader() {
    return useContext(LoadingContext);
}
