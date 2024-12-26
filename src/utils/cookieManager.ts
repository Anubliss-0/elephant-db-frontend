import Cookies from "js-cookie"
import axios from "axios"

// This will probably go after sorting app load tokens
export const setTokenCookies = (jwtToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

    Cookies.set('token', jwtToken, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
        expires: 1
    })
}

export const getTokenFromCookies = () => {
    return Cookies.get('token')
}

export const removeTokenCookies = () => {
    Cookies.remove('token', { path: '/' })
    delete axios.defaults.headers.common['Authorization']
}

export const setTokenFromCookies = (): boolean => {
    const jwtToken = getTokenFromCookies()
    if (jwtToken) {
        console.log("Token already exists")
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
        console.log("Token set in headers")
        return true
    } else {
        console.log("Token does not exist")
        return false
    }
}