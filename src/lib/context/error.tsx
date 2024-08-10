'use client'

import {
    createContext,
    useState,
    useCallback
} from 'react';

interface Error {
    id?: string;
    message: string;
    type: 'error' | 'warning' | 'info';
}

interface ErrorContextType {
    errors: Error[];
    setError: (error: Error) => void;
    clearError: (id: string) => void;
}

function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

export const ErrorContext = createContext<ErrorContextType>({
    errors: [],
    setError: () => {},
    clearError: () => {}
});

export function ErrorContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [errors, setErrors] = useState<Error[]>([]);

    const setError = useCallback((error: Error) => {
        const newError = {
            id: generateUniqueId(),
            ...error
        };
        setErrors(prevErrors => [...prevErrors, newError]);
    }, []);

    const clearError = useCallback((id: string) => {
        setErrors(prevErrors => prevErrors.filter(error => error.id !== id));
    }, []);

    return (
        <ErrorContext.Provider value={{ errors, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}