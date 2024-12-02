import { useLoaderData, Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'

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

type ImageGalleryItem = {
    original: string
    thumbnail: string
    fullscreen: string
    loading: 'lazy' | 'eager' | undefined
}

function NewShow() {
    const { elephant } = useLoaderData() as { elephant: Elephant }

    const images: ImageGalleryItem[] = elephant.photos.map(photo => ({
        original: photo.medium_url,
        thumbnail: photo.thumbnail_url,
        fullscreen: photo.original_url,
        loading: 'lazy',
    }))
    
    return (
        <>
            <h1>{elephant.name}</h1>
            <p>{elephant.id}</p>
            <p>{elephant.age}</p>
            <p>{elephant.species}</p>
            <p>{elephant.gender}</p>
            <p>{elephant.habitat}</p>
            <p>{elephant.bio}</p>
            <ImageGallery items={images} />
            <Link to={`/elephants/${elephant.id}/edit`} state={{ elephant: elephant }}>EDIT</Link>
        </>
    )
}

export default NewShow