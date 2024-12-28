import { createContext, useState, useContext, ReactNode } from 'react';
import { ProfileShowData } from '../types';

interface UserContextType {
    user: ProfileShowData | null
    setUser: (user: ProfileShowData | null) => void
    isUserInfoOpen: boolean
    setIsUserInfoOpen: (isUserInfoOpen: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false)
    const [user, setUser] = useState<ProfileShowData | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser, isUserInfoOpen, setIsUserInfoOpen }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}