import { createContext, ReactNode, useState } from 'react';

export type FeedbackModalProviderProps = {
    modalAdd: boolean;
    setModalAdd: (bool: boolean) => void;
    modalError: boolean;
    setModalError: (bool: boolean) => void;
    modalError500: boolean;
    setModalError500: (bool: boolean) => void;
    modalSuccess: boolean;
    setModalSuccess: (bool: boolean) => void;
};

export const FeedbackModalContext = createContext<Partial<FeedbackModalProviderProps>>({});

export const FeedbackModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalError, setModalError] = useState<boolean>(false);
    const [modalError500, setModalError500] = useState<boolean>(false);
    const [modalSuccess, setModalSuccess] = useState<boolean>(false);

    return (
        <FeedbackModalContext.Provider
            value={{
                modalAdd,
                setModalAdd,
                modalError,
                setModalError,
                modalError500,
                setModalError500,
                modalSuccess,
                setModalSuccess,
            }}
        >
            {children}
        </FeedbackModalContext.Provider>
    );
};
