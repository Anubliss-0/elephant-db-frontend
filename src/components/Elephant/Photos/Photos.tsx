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

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map(photo => photo.id || 'default-id')}>
                <div className={styles.gridContainer}>
                    {photos.map((photo) => (
                        <SortableItem key={photo.id || 'default-id'} id={photo.id || 'default-id'}>
                            <img className={styles.photo} src={photo.url} alt={`Photo ${photo.id}`} />
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default Photos
