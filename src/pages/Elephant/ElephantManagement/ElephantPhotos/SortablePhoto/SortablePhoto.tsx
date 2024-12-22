import { useSortable } from '@dnd-kit/sortable'
import styles from './SortablePhoto.module.scss'
import { CSS } from '@dnd-kit/utilities'
import { PhotoFormData } from '../../../../../types'
import { FaUndo } from "react-icons/fa"
import { MdOutlineDelete } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useTheme } from '../../../../../contexts/ThemeContext'

type SortablePhotoProps = {
    photo: PhotoFormData
    onDelete: () => void
    onRestore: () => void
}

function SortablePhoto({ photo, onDelete, onRestore }: SortablePhotoProps) {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const isDeleted = photo.status === 'deleted'
    const isCoverPhoto = photo.position === 0
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    }

    const imgClassName = classNames(styles.photo, {
        [styles.deleted]: isDeleted,
        [styles.coverPhoto]: !isDeleted && isCoverPhoto,
        [styles[theme]]: !isDeleted && isCoverPhoto
    })

    const renderButton = () => {
        if (!isDeleted) {
            return (
                <button
                    type="button"
                    onClick={onDelete}
                    aria-label={t('elephants.deletePhoto')}
                    className={classNames(styles.photoButton, styles.deleteButton)}
                >
                    <MdOutlineDelete />
                </button>
            )
        } else {
            return (
                <button
                    type="button"
                    onClick={onRestore}
                    aria-label={t('elephants.restorePhoto')}
                    className={classNames(styles.photoButton, styles.restoreButton)}
                >
                    <FaUndo />
                </button>
            )
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...(!isDeleted ? { ...attributes, ...listeners } : {})}
            className={styles.photoGridItem}
        >
            <div className={styles.photoGridItemContent}>
                <img
                    src={photo.thumbnail_url}
                    alt={`Photo ${photo.id}`}
                    className={imgClassName}
                />
                {!isDeleted && <span className={styles.photoNumber}>{photo.position + 1}</span>}
                {renderButton()}
            </div>
        </div>
    )
}

export default SortablePhoto