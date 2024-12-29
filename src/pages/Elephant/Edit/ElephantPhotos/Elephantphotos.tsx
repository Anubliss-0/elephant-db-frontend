import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useTranslation } from "react-i18next"
import SortablePhoto from "./SortablePhoto/SortablePhoto"
import styles from './ElephantPhotos.module.scss'
import { PhotoFormData } from "../../../../types"
import { handleFileChange, handleRestore, handleDelete, handleDragEnd } from "./elephantPhotoUtils"
import classNames from 'classnames'
import { useTheme } from "../../../../contexts/ThemeContext"
import Button from "../../../../components/Button/Button"

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
        <div className={styles.editPhotosContainer}>
            {t('elephants.photos')}
            <div className={classNames(styles.editPhotos, styles[theme])} aria-label={t('elephants.photos')}>
                <div className={classNames(styles.photosGrid, styles[theme])}>
                    <DndContext onDragEnd={(event) => handleDragEnd(event, setPhotos)} sensors={sensors}>
                        <SortableContext items={photos.map(photo => photo.id)}>
                            {photos.map(photo => (
                                <SortablePhoto photo={photo} onDelete={() => handleDelete(photo.id, setPhotos)} onRestore={() => handleRestore(photo.id, setPhotos)} key={photo.id} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
                <div className={styles.editPhotosFooter}>
                    <span>{activePhotosCount} / 5</span>
                    <input type="file" id={fileInputId} multiple accept="image/*" onChange={(event) => handleFileChange(event, photos, setPhotos)} className={styles.hiddenFileInput} />
                    <Button
                        onClick={() => document.getElementById(fileInputId)?.click()}
                        disabled={activePhotosCount >= 5}
                    >
                        {t('elephants.addPhotos')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ElephantPhotos