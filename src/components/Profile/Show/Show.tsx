import { useLoaderData } from 'react-router-dom'

type ProfileData = {
    id: string
    attributes: {
        name: string
        gender: string
        location: string
    }
}

function Show() {
    const { profile } = useLoaderData() as { profile: { data: ProfileData } }
    return (
        <div>
            <h1>{profile.data.attributes.name}</h1>
            <p>{profile.data.attributes.gender}</p>
            <p>{profile.data.attributes.location}</p>
        </div>
    )
}

export default Show