import Cookies from "js-cookie"
import axios from "axios"

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

export const getTokenFromCookies = () => {
    return Cookies.get('token')
}

export const removeTokenCookies = () => {
    Cookies.remove('token', { path: '/' })
    delete axios.defaults.headers.common['Authorization']
}