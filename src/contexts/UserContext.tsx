import { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
    userName: string | null;
    setUserName: (name: string | null) => void;
    userId: number | null;
    setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userName, setUserName] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    return (
        <UserContext.Provider value={{ userName, setUserName, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 