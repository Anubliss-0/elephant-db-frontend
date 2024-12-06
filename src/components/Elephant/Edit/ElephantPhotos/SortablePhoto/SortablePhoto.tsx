import { useSortable } from '@dnd-kit/sortable'
import styles from './SortablePhoto.module.scss'
import { CSS } from '@dnd-kit/utilities'
import { PhotoFormData } from '../../../../../types'
import { MdOutlineDelete } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
type SortablePhotoProps = {
    photo: PhotoFormData
    onDelete: () => void
}

export default function SortablePhoto({ photo, onDelete }: SortablePhotoProps) {
    const { t } = useTranslation()
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.photoItem}>
            <img src={photo.thumbnail_url} alt={`Photo ${photo.id}`} className={styles.photo} />
            <span className={styles.photoNumber}>{photo.position + 1}</span>
            <button
                type="button"
                onClick={onDelete}
                aria-label={t('elephants.deletePhoto')}
                className={styles.deleteButton}
            >
                <MdOutlineDelete />
            </button>
        </div>
    )
}