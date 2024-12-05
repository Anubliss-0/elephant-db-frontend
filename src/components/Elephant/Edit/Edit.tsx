import { useState, useEffect, useId } from 'react'
import { useLocation, useFetcher } from 'react-router-dom'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './Edit.module.scss'
import { useTranslation } from 'react-i18next'

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
    photos: PhotoFormData[]
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
    const elephant = location.state.elephant as Elephant
    const [photos, setPhotos] = useState<PhotoFormData[]>([])
    const [currentName, setCurrentName] = useState(elephant.name)
    const { t } = useTranslation()
    const fetcher = useFetcher()
    const fileInputId = useId();

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newPhotos = Array.from(files).map((file, index) => ({
                id: Date.now() + index,
                status: 'new',
                position: photos.length + index,
                image: file,
                thumbnail_url: URL.createObjectURL(file),
                previous_position: photos.length + index
            }))

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setPhotos((prevPhotos) => {
                const oldIndex = prevPhotos.findIndex(photo => photo.id === active.id)
                const newIndex = prevPhotos.findIndex(photo => photo.id === over.id)

                const updatedPhotos = [...prevPhotos]
                const [movedPhoto] = updatedPhotos.splice(oldIndex, 1)
                updatedPhotos.splice(newIndex, 0, movedPhoto)

                return updatedPhotos.map((photo, index) => ({
                    ...photo,
                    position: index
                }))
            })
        }
    }

    const handleDelete = (id: number) => {
        setPhotos(prevPhotos => {
            const photoToDelete = prevPhotos.find(p => p.id === id)
            if (!photoToDelete) return prevPhotos

            if (photoToDelete.status === "new") {
                return prevPhotos.filter(p => p.id !== id)
            }

            const updatedPhotos = prevPhotos.filter(p => p.id !== id)
            return [...updatedPhotos, { ...photoToDelete, status: "deleted", previous_position: photoToDelete.position }]
        })
    }

    const handleRestore = (id: number) => {
        setPhotos(prevPhotos => {
            const photoToRestore = prevPhotos.find(p => p.id === id)
            if (!photoToRestore) return prevPhotos

            const updatedPhotos = prevPhotos.filter(p => p.id !== id)
            const restoredPhoto = { ...photoToRestore, status: "" }

            updatedPhotos.splice(photoToRestore.previous_position ?? 0, 0, restoredPhoto)

            return updatedPhotos.map((photo, index) => ({
                ...photo,
                position: index
            }))
        })
    }

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

        fetcher.submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
    }

    return (
        <div className={styles.edit}>
            <h1>{t('elephants.editing')} {currentName}</h1>
            <fetcher.Form onSubmit={handleSubmit} className={styles.editForm}>
                <div className={styles.editFields}>
                    <label className={styles.editFormItem}>
                        {t('elephants.name')}
                        <input type="text" name="elephant[name]" defaultValue={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                    </label>
                    <label className={styles.editFormItem}>
                        {t('elephants.age')}
                        <input type="number" name="elephant[age]" defaultValue={elephant.age} />
                    </label>
                    <label className={styles.editFormItem}>
                        {t('elephants.species')}
                        <input type="text" name="elephant[species]" defaultValue={elephant.species} />
                    </label>
                    <label className={styles.editFormItem}>
                        {t('elephants.gender')}
                        <input type="text" name="elephant[gender]" defaultValue={elephant.gender} />
                    </label>
                    <label className={styles.editFormItem}>
                        {t('elephants.habitat')}
                        <input type="text" name="elephant[habitat]" defaultValue={elephant.habitat} />
                    </label>
                    <label className={styles.fileUploadLabel}>
                        <input type="file" id={fileInputId} multiple accept="image/*" onChange={handleFileChange} className={styles.hiddenFileInput} />
                        <button type="button" onClick={() => document.getElementById(fileInputId)?.click()} className={styles.customUploadButton}>
                            {t('elephants.addPhotos')}
                        </button>
                    </label>
                </div>
                <div className={styles.editPhotos}>
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={photos.map(photo => photo.id)}>
                            {photos.map(photo => (
                                <div key={photo.id} className={styles.photoItem}>
                                    <SortablePhoto photo={photo} />
                                    <button type="button" onClick={() => handleDelete(photo.id)}>Delete</button>
                                    {photo.status === "deleted" && <button type="button" onClick={() => handleRestore(photo.id)}>Restore</button>}
                                </div>
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
                <div className={styles.editBio}>
                    <label className={styles.editFormItem}>
                        {t('elephants.bio')}
                        <textarea name="elephant[bio]" defaultValue={elephant.bio} />
                    </label>
                </div>
                <button type="submit">Save</button>
            </fetcher.Form>
            {/* <fetcher.Form method="DELETE">
                <button type="submit">Delete Elephant</button>
            </fetcher.Form> */}
        </div>
    )
}

export default Edit