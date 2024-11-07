import { useEffect, useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import SortableItem from "../Photos/SortableItem"
import styles from "./PhotoUploader.module.scss"
import { Photo } from "../../../types"

interface PhotoUploaderProps {
    photos: Photo[]
    onPhotosChange: (photos: Photo[]) => void
}

function PhotoUploader({ photos, onPhotosChange }: PhotoUploaderProps) {    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setErrorMessage(null)
    }, [photos])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = photos.findIndex(photo => photo.id === active.id)
            const newIndex = photos.findIndex(photo => photo.id === over?.id)
            const updatedPhotos = arrayMove(photos, oldIndex, newIndex)
            const photosWithUpdatedPositions = updatedPhotos.map((photo, index) => ({
                ...photo,
                position: index,
            }));
            onPhotosChange(photosWithUpdatedPositions)
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const currentPhotoCount = photos.length
            const newFileCount = files.length
            
            if (currentPhotoCount + newFileCount > 5) {
                setErrorMessage("Cannot add more than 5 photos total")
                return
            }

            const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
                id: `new-${photos.length + index}`,
                url: URL.createObjectURL(file),
                status: "new", 
                position: photos.length + index,
                file: file,
            }));
            onPhotosChange([...photos, ...newPhotos])
        }
    }

    const handleDelete = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation()
        onPhotosChange(photos.filter(photo => photo.id !== id))
    }

    return (
        <div className={styles.gridContainer}>
            <>
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={photos.map(photo => photo.id || 'default-id')}>
                        {photos.map(photo => (
                            <SortableItem key={photo.id || 'default-id'} id={photo.id || 'default-id'}>
                                <div>
                                    <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                    <button type="button" onPointerDown={(event) => handleDelete(event, photo.id || 'default-id')}>
                                        Delete
                                    </button>
                                </div>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} />
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
    )
}

export default PhotoUploader