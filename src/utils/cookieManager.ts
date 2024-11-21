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

export const removeTokenCookies = () => {
    Cookies.remove('token', { path: '/' })
    delete axios.defaults.headers.common['Authorization']
}

export const replaceUserProfileInCookies = (newProfile: { data: { attributes: { [key: string]: any } } }) => {
    console.log('Attempting to update user profile in cookies with:', newProfile);

    const user = getUserCookies();
    if (user) {
        console.log('Current user data retrieved from cookies:', user);

        // Ensure newProfile has the expected structure
        if (newProfile.data && newProfile.data.attributes) {
            // Update the profile part of the user object
            user.profile = { ...user.profile, ...newProfile.data.attributes };
            console.log('Updated user data:', user);

            // Save the updated user object back to the cookies
            Cookies.set('user', JSON.stringify(user), {
                path: '/',
                secure: true,
                sameSite: 'Strict',
                expires: 1
            });
            console.log('User data successfully updated in cookies.');
        } else {
            console.error('Invalid profile data structure:', newProfile);
        }
    } else {
        console.error('No user data found in cookies to update.');
    }
}