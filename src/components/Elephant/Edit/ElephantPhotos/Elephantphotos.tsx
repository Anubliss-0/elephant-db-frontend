import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useTranslation } from "react-i18next"
import SortablePhoto from "./SortablePhoto/SortablePhoto"
import styles from './ElephantPhotos.module.scss'
import { PhotoFormData } from "../../../../types"
import { handleFileChange, handleRestore, handleDelete, handleDragEnd } from "./elephantPhotoUtils"
import classNames from 'classnames'
import { useTheme } from "../../../../contexts/ThemeContext"

type ElephantPhotosProps = {
    photos: PhotoFormData[]
    setPhotos: React.Dispatch<React.SetStateAction<PhotoFormData[]>>
    fileInputId: string
}

function ElephantPhotos({ photos, setPhotos, fileInputId }: ElephantPhotosProps) {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const activePhotosCount = photos.filter(photo => photo.status === "new" || photo.status === "").length;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )


    return (
        <div className={classNames(styles.editPhotosContainer, styles[theme])}>
            <div className={styles.editPhotos}>
                <DndContext onDragEnd={(event) => handleDragEnd(event, setPhotos)} sensors={sensors}>
                    <SortableContext items={photos.map(photo => photo.id)}>
                        {photos.map(photo => (
                            <div key={photo.id} className={styles.photoItem}>
                                <SortablePhoto photo={photo} onDelete={() => handleDelete(photo.id, setPhotos)} onRestore={() => handleRestore(photo.id, setPhotos)} />
                            </div>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            <div className={styles.editPhotosFooter}>
                <div className={styles.editPhotosFooterContent}>
                    <span>{activePhotosCount} / 5</span>
                    <input type="file" id={fileInputId} multiple accept="image/*" onChange={(event) => handleFileChange(event, photos, setPhotos)} className={styles.hiddenFileInput} />
                    <button
                        type="button"
                        onClick={() => document.getElementById(fileInputId)?.click()}
                        className={classNames({ [styles.disabled]: activePhotosCount >= 5 })}
                        disabled={activePhotosCount >= 5}
                    >
                        {t('elephants.addPhotos')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ElephantPhotos