import { userProfile, UserProfileResponse } from '../types'

export const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}

export const removeItem = (key: string) => {
    localStorage.removeItem(key)
}

export const clearStorage = () => {
    localStorage.clear()
}

export const storeProfileData = (response: UserProfileResponse) => {
    let profileData: userProfile

    if (response.data) {
        profileData = {
            userName: response.data.name,
            userId: response.data.user_id,
            profileId: response.data.id,
            profileImageUrl: response.data.profileimage_url
        }
    } else {
        console.error("Unexpected response format");
        return;
    }

    setItem('profileData', profileData);
}

export const clearProfileData = () => {
    removeItem('profileData')
}

