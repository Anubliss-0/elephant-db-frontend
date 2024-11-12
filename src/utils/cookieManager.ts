import Cookies from "js-cookie"
import axios from "axios"
import { User } from "../types"

export const setCookies = (jwtToken: string, user: User) => {
    setTokenCookies(jwtToken, true)
    setUserCookies(user, true)
}

export const setTokenCookies = (jwtToken: string, storeInCookies = false) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

    if (storeInCookies) {
        Cookies.set('token', jwtToken, {
            path: '/',
            secure: true,
            sameSite: 'Strict',
            expires: 1
        })
    }
}

export const setUserCookies = (user: User, storeInCookies = false) => {
    if (storeInCookies) {
        Cookies.set('user', JSON.stringify(user), {
            path: '/',
            secure: true,
            sameSite: 'Strict',
            expires: 1
        })
    }
}

export const getUserCookies = (): User | null => {
    const user = Cookies.get('user')
    try {
        return user ? JSON.parse(user) as User : null
    } catch (error) {
        console.error('Failed to parse user data from cookies:', error)
        return null
    }
}

export const getTokenFromCookies = () => {
    return Cookies.get('token')
}

export const removeCookies = () => {
    Cookies.remove('token', { path: '/' })
    Cookies.remove('user', { path: '/' })

    delete axios.defaults.headers.common['Authorization']
}