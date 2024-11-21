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

export const storeProfileData = (response: any) => {
    const profileData = {
        userName: response.profile.name,
        userId: response.profile.user_id,
        profileId: response.profile.id,
        profileImageUrl: response.profile.profileimage_url
    }
    setItem('profileData', profileData)
}

export const clearProfileData = () => {
    removeItem('profileData')
}

