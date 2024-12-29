import Cookies from "js-cookie"
import axios from "axios"

export const setTokenCookies = (jwtToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

    Cookies.set('token', jwtToken, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
        expires: 1
    })
}

export const removeTokenCookies = () => {
    Cookies.remove('token', { path: '/' })
    delete axios.defaults.headers.common['Authorization']
}

export const setTokenFromCookies = (): boolean => {
    const jwtToken = Cookies.get('token')
    if (jwtToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
        return true
    } else {
        return false
    }
}