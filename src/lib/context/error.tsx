'use client'

import {
    createContext,
    useState,
    useCallback
} from 'react'

interface ErrorContextType {
    error: { [key: string]: string };
    setError: (key: string, message: string) => void;
    clearError: (key: string) => void;
}

export const ErrorContext = createContext<ErrorContextType>({
    error: {},
    setError: () => {},
    clearError: () => {}
});

export function ErrorContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [error, setErrorState] = useState<{ [key: string]: string }>({});

    const setError = useCallback((key: string, message: string) => {
        setErrorState(prevError => ({ ...prevError, [key]: message }));
    }, []);

    const clearError = useCallback((key: string) => {
        setErrorState(prevError => {
            const { [key]: _, ...rest } = prevError;
            return rest;
        });
    }, []);

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}