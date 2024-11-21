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
    let profileData;

    if (response.profile) {
        // Original response structure
        profileData = {
            userName: response.profile.name,
            userId: response.profile.user_id,
            profileId: response.profile.id,
            profileImageUrl: response.profile.profileimage_url
        };
    } else if (response.data && response.data.attributes) {
        // New response structure
        profileData = {
            userName: response.data.attributes.name,
            userId: response.data.attributes.user_id,
            profileId: response.data.attributes.id,
            profileImageUrl: response.data.attributes.profileimage_url
        };
    } else {
        console.error("Unexpected response format");
        return;
    }

    setItem('profileData', profileData);
}

export const clearProfileData = () => {
    removeItem('profileData')
}

