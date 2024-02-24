import {createContext, ReactNode, useState} from "react";

interface ILoader {
    loader: boolean;
    setLoader: (bool: boolean) => void;
}

export const LoadingContext = createContext<Partial<ILoader>>({});

const LoaderProvider = ({children}: { children: ReactNode }) => {
    const [loader, setLoader] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{loader, setLoader}}>{children}</LoadingContext.Provider>
    );
};

export default LoaderProvider;
