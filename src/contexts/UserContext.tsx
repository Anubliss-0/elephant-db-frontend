import { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    userName: string | null;
    profileId: number | null;
    userId: number | null;
    profileImageUrl: string | null;
}

interface UserContextType {
    user: User;
    setUser: (user: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User>(() => {
        const storedUser = localStorage.getItem('profileData');
        return storedUser ? JSON.parse(storedUser) : {
            userName: null,
            profileId: null,
            userId: null,
            profileImageUrl: null,
        };
    });

    const setUser = (updatedUser: Partial<User>) => {
        setUserState((prevUser) => ({ ...prevUser, ...updatedUser }));
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
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