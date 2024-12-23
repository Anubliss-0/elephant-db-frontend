import { DragEndEvent } from "@dnd-kit/core"
import { toast } from 'react-toastify'
import i18n from '../../../../i18n'
import { PhotoFormData } from "../../../../types"

export function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    photos: PhotoFormData[],
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
) {
    const files = event.target.files
    if (files) {
        const existingNewPhotosCount = photos.filter(photo => photo.status === 'new' || photo.status === '').length
        const newPhotosCount = files.length

        if (existingNewPhotosCount + newPhotosCount > 5) {
            toast.error(i18n.t('errors.photoCountLimit'))
            return
        }

        const newPhotos = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            status: 'new',
            position: photos.length + index,
            image: file,
            thumbnail_url: URL.createObjectURL(file),
            previous_position: photos.length + index
        }))

        setPhotos((prevPhotos) => {
            const nonDeletedPhotos = prevPhotos.filter(photo => photo.status !== 'deleted')
            const deletedPhotos = prevPhotos.filter(photo => photo.status === 'deleted')
            return [...nonDeletedPhotos, ...newPhotos, ...deletedPhotos].map((photo, index) => ({
                ...photo,
                position: index
            }))
        })
    }
}

export function handleRestore(
    id: number,
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
) {
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

export function handleDelete(
    id: number,
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
) {
    setPhotos(prevPhotos => {
        const photoToDelete = prevPhotos.find(p => p.id === id)
        if (!photoToDelete || photoToDelete.status === "deleted") return prevPhotos

        let updatedPhotos;
        if (photoToDelete.status === "new") {
            updatedPhotos = prevPhotos.filter(p => p.id !== id)
        } else {
            updatedPhotos = prevPhotos.filter(p => p.id !== id)
            updatedPhotos = [...updatedPhotos, { ...photoToDelete, status: "deleted", previous_position: photoToDelete.position }]
        }

        return updatedPhotos.map((photo, index) => ({
            ...photo,
            position: index
        }))
    })
}

export function handleDragEnd(
    event: DragEndEvent,
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
) {
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