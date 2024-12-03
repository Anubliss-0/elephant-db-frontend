import { useState, useEffect } from 'react'
import { useLocation, Form, useSubmit } from 'react-router-dom'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './Edit.module.scss'

// TODO: Might not need this
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
    previous_position: number | null
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
            thumbnail_url: photo.thumbnail_url,
            previous_position: photo.position
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
                thumbnail_url: URL.createObjectURL(file),
                previous_position: photos.length + index
            }));

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    };

    const handleDelete = (id: number) => {
        setPhotos(prevPhotos => {
            const photoToDelete = prevPhotos.find(p => p.id === id);
            if (!photoToDelete) return prevPhotos;

            if (photoToDelete.status === "new") {
                return prevPhotos.filter(p => p.id !== id);
            }

            const updatedPhotos = prevPhotos.filter(p => p.id !== id);
            return [...updatedPhotos, { ...photoToDelete, status: "deleted", previous_position: photoToDelete.position }];
        });
    }
    
    const handleRestore = (id: number) => {
        setPhotos(prevPhotos => {
            const photoToRestore = prevPhotos.find(p => p.id === id);
            if (!photoToRestore) return prevPhotos;

            const updatedPhotos = prevPhotos.filter(p => p.id !== id);
            const restoredPhoto = { ...photoToRestore, status: "" };

            updatedPhotos.splice(photoToRestore.previous_position ?? 0, 0, restoredPhoto);

            return updatedPhotos.map((photo, index) => ({
                ...photo,
                position: index
            }));
        });
    }

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
                            <div key={photo.id}>
                                <SortablePhoto photo={photo} />
                                <button type="button" onClick={() => handleDelete(photo.id)}>Delete</button>
                                {photo.status === "deleted" && <button type="button" onClick={() => handleRestore(photo.id)}>Restore</button>}
                            </div>
                        ))}
                    </SortableContext>
                </DndContext>
                <button type="submit">Save</button>
            </Form>
        </div>
    )
}

export default Edit