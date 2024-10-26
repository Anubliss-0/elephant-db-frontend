import { Photo } from "../../../types"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import SortableItem from "./SortableItem"
import styles from './Photos.module.scss'

interface PhotosProps {
    photos: Photo[];
    onPhotosChange: (photos: Photo[]) => void;
}

function Photos({ photos, onPhotosChange }: PhotosProps) {
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
        event.preventDefault(); // Prevent form submission
        const updatedPhotos = photos.map(photo => {
            if (photo.id === photoId) {
                if (photo.status === "keep") {
                    return { ...photo, status: "deleted" };
                } else if (photo.status === "deleted") {
                    return { ...photo, status: "keep" };
                }
            }
            return photo;
        });
        onPhotosChange(updatedPhotos as Photo[]);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map(photo => photo.id || 'default-id')}>
                <div className={styles.gridContainer}>
                    {photos.map((photo) => (
                        <SortableItem key={photo.id || 'default-id'} id={photo.id || 'default-id'}>
                            <div>
                                <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                                <button type="button" onPointerDown={(event) => handleDelete(event, photo.id)}>
                                    Delete
                                </button>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default Photos
