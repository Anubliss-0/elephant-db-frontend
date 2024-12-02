import { useLocation, Form } from 'react-router-dom'

type Photo = {
    id: number
    original_url: string
    thumbnail_url: string
    medium_url: string
    position: number
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

function Edit() {
    const location = useLocation()
    const elephant = location.state.elephant as Elephant

    return (
        <div>
            <h1>Edit</h1>
            <p>{elephant.name}</p>
            <Form method="PUT">
                <input type="text" name="name" defaultValue={elephant.name} />
                <input type="text" name="bio" defaultValue={elephant.bio} />
                <input type="number" name="age" defaultValue={elephant.age} />
                <input type="text" name="species" defaultValue={elephant.species} />
                <input type="text" name="gender" defaultValue={elephant.gender} />
                <input type="text" name="habitat" defaultValue={elephant.habitat} />
                <button type="submit">Save</button>
            </Form>
        </div>
    )
}

export default Edit