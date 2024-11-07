import { useState, useEffect } from 'react';
import { Photo } from "../../../types"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem"
import styles from './Photos.module.scss'

interface PhotosProps {
    photos: Photo[];
    onPhotosChange: (photos: Photo[]) => void;
    isEditing: boolean;
}

function Photos({ photos, onPhotosChange, isEditing }: PhotosProps) {
    const [activePhotoCount, setActivePhotoCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const count = photos.filter(photo => photo.status === "keep" || photo.status === "new").length;
        setActivePhotoCount(count);
        setErrorMessage(null)
    }, [photos]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = photos.findIndex(photo => photo.id === active.id);
            const newIndex = photos.findIndex(photo => photo.id === over?.id);
            const updatedPhotos = arrayMove(photos, oldIndex, newIndex);

            const photosWithUpdatedPositions = updatedPhotos.map((photo, index) => ({
                ...photo,
                position: index,
            }));

            onPhotosChange(photosWithUpdatedPositions);
        }
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, photoId: string) => {
        event.preventDefault();
        const updatedPhotos = photos
            .map(photo => {
                if (photo.id === photoId) {
                    if (photo.status === "keep") {
                        return { ...photo, status: "deleted" };
                    } else if (photo.status === "deleted") {
                        return { ...photo, status: "keep" };
                    }
                }
                return photo;
            })
            .filter(photo => !(photo.id === photoId && photo.status === "new"));
        onPhotosChange(updatedPhotos as Photo[]);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const currentActiveCount = photos.filter(photo => photo.status === "keep" || photo.status === "new").length;
            const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

            if (currentActiveCount + newFiles.length > 5) {
                setErrorMessage("Cannot add more than 5 active photos.");
                return;
            }

            const newPhotos: Photo[] = newFiles.map((file, index) => ({
                id: `new-${photos.length + index}`,
                url: URL.createObjectURL(file),
                status: "new",
                position: photos.length + index,
                file: file,
            }));

            onPhotosChange([...photos, ...newPhotos]);
        }
    };

    return (
        <>
            <div className={styles.gridContainer}>
                {isEditing ? (
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={photos.map(photo => photo.id || 'default-id')}>
                            <div className={styles.activePhotos}>
                                {photos.filter(photo => photo.status !== "deleted").map((photo, index) => (
                                    <SortableItem key={photo.id || 'default-id'} id={photo.id || 'default-id'}>
                                        <div>
                                            <div>Photo {index + 1}</div>
                                            <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                            <button type="button" onPointerDown={(event) => handleDelete(event, photo.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </SortableItem>
                                ))}
                            </div>
                            <div className={styles.deletedPhotos}>
                                {photos.filter(photo => photo.status === "deleted").map((photo, index) => (
                                    <div key={photo.id || 'default-id'}>
                                        <div>Photo {index + 1}</div>
                                        <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                        <button type="button" onPointerDown={(event) => handleDelete(event, photo.id)}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <>
                        <div className={styles.activePhotos}>
                            {photos.filter(photo => photo.status !== "deleted").map((photo, index) => (
                                <div key={photo.id || 'default-id'}>
                                    <div>Photo {index + 1}</div>
                                    <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.deletedPhotos}>
                            {photos.filter(photo => photo.status === "deleted").map((photo, index) => (
                                <div key={photo.id || 'default-id'}>
                                    <div>Photo {index + 1}</div>
                                    <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {isEditing && <input type="file" accept="image/*" multiple onChange={handleFileUpload} />}
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <div>{activePhotoCount} / 5</div>
        </>
    );
}

export default Photos
