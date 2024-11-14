import { Form, useLoaderData, useSubmit, useLocation } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserCookies } from '../../../utils/cookieManager'

type ProfileData = {
    id: string
    attributes: {
        user_id: string
        name: string
        gender: string
        location: string
        profileimage_url: string
        elephants_count: number
        created_at: string
    }
}

function Show() {
    const submit = useSubmit()
    const location = useLocation()
    const { profile } = useLoaderData() as { profile: { data: ProfileData } }
    const { setUserName, setProfileImageUrl } = useUser()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const user = getUserCookies()
        if (user) {
            setUserName(user.profile.name)
            setProfileImageUrl(user.profile.profileimage_url)
        }
    }, [location])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
        setIsEditing(false)
    }

    return (
        <div>
            <Form method="PATCH" onSubmit={handleSubmit}>
                <h1>
                    {isEditing ? (
                        <input type="text" name="profile[name]" defaultValue={profile.data.attributes.name} />
                    ) : (
                        profile.data.attributes.name
                    )}
                </h1>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[gender]" defaultValue={profile.data.attributes.gender} />
                    ) : (
                        profile.data.attributes.gender
                    )}
                </p>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[location]" defaultValue={profile.data.attributes.location} />
                    ) : (
                        profile.data.attributes.location
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
                <p>
                    {profile.data.attributes.elephants_count} elephants
                </p>
                <p>
                    {profile.data.attributes.created_at}
                </p>
                {isEditing ? (
                    <>
                        <button type="submit">Update Profile</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </Form>
            <Link to={`/elephants?user_id=${profile.data.attributes.user_id}`}>
                View My Elephants
            </Link>
        </div>
    )
}

export default Show