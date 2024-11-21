import { createContext, useState, useContext, ReactNode } from 'react';
import { userProfileContext } from '../types';

interface UserContextType {
    user: userProfileContext;
    setUser: (user: Partial<userProfileContext>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<userProfileContext>(() => {
        const storedUser = localStorage.getItem('profileData');
        return storedUser ? JSON.parse(storedUser) : {
            userName: null,
            profileId: null,
            userId: null,
            profileImageUrl: null,
        };
    });

    const setUser = (updatedUser: Partial<userProfileContext>) => {
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