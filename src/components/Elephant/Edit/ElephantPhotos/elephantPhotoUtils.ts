import { DragEndEvent } from "@dnd-kit/core"
import { PhotoFormData } from "../../../../types"

export function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    photos: PhotoFormData[],
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
) {
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
        if (!photoToDelete) return prevPhotos

        if (photoToDelete.status === "new") {
            return prevPhotos.filter(p => p.id !== id)
        }

        const updatedPhotos = prevPhotos.filter(p => p.id !== id)
        return [...updatedPhotos, { ...photoToDelete, status: "deleted", previous_position: photoToDelete.position }]
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