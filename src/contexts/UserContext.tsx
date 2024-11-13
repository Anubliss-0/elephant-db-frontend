import { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
    userName: string | null;
    setUserName: (name: string | null) => void;
    profileId: number | null;
    setProfileId: (id: number | null) => void;
    userId: number | null;
    setUserId: (id: number | null) => void;
    profileImageUrl: string | null;
    setProfileImageUrl: (url: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userName, setUserName] = useState<string | null>(null);
    const [profileId, setProfileId] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ userName, setUserName, profileId, setProfileId, userId, setUserId, profileImageUrl, setProfileImageUrl }}>
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