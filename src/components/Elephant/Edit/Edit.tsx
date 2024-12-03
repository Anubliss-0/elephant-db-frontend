import { useState, useEffect } from 'react'
import { useLocation, Form, useSubmit } from 'react-router-dom'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './Edit.module.scss'

type Photo = {
    id: number
    original_url: string
    thumbnail_url: string
    medium_url: string
    position: number
}

type PhotoFormData = {
    id: number
    status: string
    position: number
    image: File | null
    thumbnail_url: string
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

function SortablePhoto({ photo }: { photo: PhotoFormData }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.id })
    

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img src={photo.thumbnail_url} alt={`Photo ${photo.id}`} className={styles.photo} />
        </div>
    )
}

function Edit() {
    const location = useLocation()
    const submit = useSubmit()
    const elephant = location.state.elephant as Elephant
    const [photos, setPhotos] = useState<PhotoFormData[]>([])

    useEffect(() => {
        setPhotos(elephant.photos.map((photo) => ({
            id: photo.id,
            status: '',
            position: photo.position,
            image: null,
            thumbnail_url: photo.thumbnail_url
        })))
    }, [elephant])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        photos.forEach((photo, index) => {
            formData.append(`elephant[photos_attributes][${index}][id]`, photo.id.toString())
            formData.append(`elephant[photos_attributes][${index}][position]`, photo.position.toString())
            formData.append(`elephant[photos_attributes][${index}][status]`, photo.status)
            if (photo.image) {
                formData.append(`elephant[photos_attributes][${index}][image]`, photo.image)
            }
        })

        submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setPhotos((prevPhotos) => {
                const oldIndex = prevPhotos.findIndex(photo => photo.id === active.id);
                const newIndex = prevPhotos.findIndex(photo => photo.id === over.id);

                const updatedPhotos = [...prevPhotos];
                const [movedPhoto] = updatedPhotos.splice(oldIndex, 1);
                updatedPhotos.splice(newIndex, 0, movedPhoto);

                return updatedPhotos.map((photo, index) => ({
                    ...photo,
                    position: index
                }));
            });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPhotos = Array.from(files).map((file, index) => ({
                id: Date.now() + index,
                status: 'new',
                position: photos.length + index,
                image: file,
                thumbnail_url: URL.createObjectURL(file)
            }));

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    };

    return (
        <div>
            <h1>Edit</h1>
            <p>{elephant.name}</p>
            <Form onSubmit={handleSubmit}>
                <input type="text" name="elephant[name]" defaultValue={elephant.name} />
                <input type="text" name="elephant[bio]" defaultValue={elephant.bio} />
                <input type="number" name="elephant[age]" defaultValue={elephant.age} />
                <input type="text" name="elephant[species]" defaultValue={elephant.species} />
                <input type="text" name="elephant[gender]" defaultValue={elephant.gender} />
                <input type="text" name="elephant[habitat]" defaultValue={elephant.habitat} />
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={photos.map(photo => photo.id)}>
                        {photos.map(photo => (
                            <SortablePhoto key={photo.id} photo={photo} />
                        ))}
                    </SortableContext>
                </DndContext>
                <button type="submit">Save</button>
            </Form>
        </div>
    )
}

export default Edit