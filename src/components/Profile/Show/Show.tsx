import { useLoaderData } from 'react-router-dom'
import { updateProfile } from '../../../utils/api'
import { useUser } from '../../../contexts/UserContext'
import { useState } from 'react'

type ProfileData = {
    id: string
    attributes: {
        name: string
        gender: string
        location: string
        profileimage_url: string
    }
}

function Show() {
    const { profile } = useLoaderData() as { profile: { data: ProfileData } }
    const { setUserName } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const [localProfile, setLocalProfile] = useState(profile.data.attributes)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await updateProfile(profile.data.id, formData)
        const updatedAttributes = response.data.data.attributes
        setUserName(updatedAttributes.name)
        document.cookie = `user_name=${encodeURIComponent(updatedAttributes.name)}; path=/; Secure; SameSite=Strict`;
        setLocalProfile(updatedAttributes)
        setIsEditing(false)
    }

    return (
        <div>
            <form onSubmit={isEditing ? handleSubmit : undefined} encType="multipart/form-data">
                <h1>
                    {isEditing ? (
                        <input type="text" name="profile[name]" defaultValue={localProfile.name} />
                    ) : (
                        localProfile.name
                    )}
                </h1>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[gender]" defaultValue={localProfile.gender} />
                    ) : (
                        localProfile.gender
                    )}
                </p>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[location]" defaultValue={localProfile.location} />
                    ) : (
                        localProfile.location
                    )}
                </p>
                <div>
                    {isEditing ? (
                        <div>
                            <label htmlFor="profileimage">Profile Image:</label>
                            <input 
                                type="file" 
                                name="profile[profileimage]" 
                                id="profileimage"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file && file.size > 5 * 1024 * 1024) {
                                        alert('File size must be less than 5MB');
                                        e.target.value = '';
                                    }
                                }}
                                accept="image/*"
                            />
                        </div>
                    ) : (
                        <p>
                            <img src={profile.data.attributes.profileimage_url} alt="Profile Picture" />
                        </p>
                    )}
                </div>
                {isEditing ? (
                    <>
                        <button type="submit">Update Profile</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </form>
        </div>
    )
}

export default Show