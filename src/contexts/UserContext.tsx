import { createContext, useState, useContext, ReactNode } from 'react';
import { ProfileShowData } from '../types';

interface UserContextType {
    user: ProfileShowData
    setUser: (user: ProfileShowData) => void
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<ProfileShowData>({
        user_id: '',
        name: '',
        gender: '',
        location: '',
        profileimage_url: '',
        elephants_count: 0,
        created_at: '',
        can_edit: false
    })

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
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