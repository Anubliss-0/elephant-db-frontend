import { useLoaderData, Link } from 'react-router-dom'

type Photo = {
    id: number
    url: string
}

type Elephant = {
    id: string
    name: string
    species: string
    gender: string
    habitat: string
    bio: string
    user_id: number
    age: number
    photos: Photo[]
    profile_id: number
    can_edit: boolean | null
    user_name: string
    user_profile_image_url: string
}

function NewShow() {
    const { elephant } = useLoaderData() as { elephant: Elephant }
    return (
        <>
            <h1>{elephant.name}</h1>
            <p>{elephant.id}</p>
            <p>{elephant.age}</p>
            <p>{elephant.species}</p>
            <p>{elephant.gender}</p>
            <p>{elephant.habitat}</p>
            <p>{elephant.bio}</p>
            <Link to={`/elephants/${elephant.id}/edit`} state={{ elephant: elephant }}>EDIT</Link>
        </>
    )
}

export default NewShow