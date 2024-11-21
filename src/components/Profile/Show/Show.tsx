import { Form, useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'
import { getItem } from '../../../utils/localStorageManager'

type ProfileShowData = {
    user_id: string
    name: string
    gender: string
    location: string
    profileimage_url: string
    elephants_count: number
    created_at: string
}

function Show() {
    const { profile } = useLoaderData() as { profile: ProfileShowData }
    const [isEditing, setIsEditing] = useState(false)
    const { setUser } = useUser()

    useEffect(() => {
        const storedUser = getItem('profileData')
        if (storedUser) {
            setUser(storedUser)
        }
    }, [profile])

    return (
        <div>
            <Form
                method="PATCH"
                encType="multipart/form-data"
                onSubmit={() => setIsEditing(false)}
            >
                <h1>
                    {isEditing ? (
                        <input type="text" name="profile[name]" defaultValue={profile.name} required />
                    ) : (
                        profile.name
                    )}
                </h1>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[gender]" defaultValue={profile.gender} />
                    ) : (
                        profile.gender
                    )}
                </p>
                <p>
                    {isEditing ? (
                        <input type="text" name="profile[location]" defaultValue={profile.location} />
                    ) : (
                        profile.location
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
                            <img src={profile.profileimage_url} alt="Profile Picture" />
                        </p>
                    )}
                </div>
                <p>
                    {profile.elephants_count} elephants
                </p>
                <p>
                    {profile.created_at}
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
            <Link to={`/elephants?user_id=${profile.user_id}`}>
                View My Elephants
            </Link>
        </div>
    )
}

export default Show