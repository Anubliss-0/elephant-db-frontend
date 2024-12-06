import { DndContext } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useTranslation } from "react-i18next"
import SortablePhoto from "./SortablePhoto/SortablePhoto"
import styles from './ElephantPhotos.module.scss'
import { PhotoFormData } from "../../../../types"
import { handleFileChange, handleRestore, handleDelete, handleDragEnd } from "./elephantPhotoUtils"

type ElephantPhotosProps = {
    photos: PhotoFormData[]
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
    fileInputId: string
}

function ElephantPhotos({ photos, setPhotos, fileInputId }: ElephantPhotosProps) {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.editPhotos}>
                <DndContext onDragEnd={(event) => handleDragEnd(event, setPhotos)}>
                    <SortableContext items={photos.map(photo => photo.id)}>
                        {photos.map(photo => (
                            <div key={photo.id} className={styles.photoItem}>
                                <SortablePhoto photo={photo} />
                                <button type="button" onClick={() => handleDelete(photo.id, setPhotos)}>Delete</button>
                                {photo.status === "deleted" && <button type="button" onClick={() => handleRestore(photo.id, setPhotos)}>Restore</button>}
                            </div>
                        ))}
                    </SortableContext>
                </DndContext>
                <button type="button" onClick={() => document.getElementById(fileInputId)?.click()} className={styles.customUploadButton}>
                    {t('elephants.addPhotos')}
                </button>
                <input type="file" id={fileInputId} multiple accept="image/*" onChange={(event) => handleFileChange(event, photos, setPhotos)} className={styles.hiddenFileInput} />
            </div>
        </>
    )
}

export default ElephantPhotos