'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'userSession';

interface SessionContextProps {
    sessionId: string | null;
    createSession: () => void;
    clearSession: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
    undefined,
);

const getSession = () =>
    typeof window !== 'undefined'
        ? window.localStorage.getItem(SESSION_KEY)
        : null;

const saveSession = (sessionId: string) =>
    typeof window !== 'undefined' &&
    window.localStorage.setItem(SESSION_KEY, sessionId);

const clearSessionStorage = () => {
    typeof window !== 'undefined' &&
        window.localStorage.removeItem(SESSION_KEY);
};

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        const existingSession = getSession();
        if (existingSession) {
            setSessionId(existingSession);
        } else {
            createSession();
        }
    }, []);

    const createSession = () => {
        const newSessionId = uuidv4();
        saveSession(newSessionId);
        setSessionId(newSessionId);
    };

    const clearSession = () => {
        clearSessionStorage();
        setSessionId(null);
    };

    return (
        <SessionContext.Provider
            value={{
                sessionId,
                createSession,
                clearSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

export { SessionProvider, useSession };
