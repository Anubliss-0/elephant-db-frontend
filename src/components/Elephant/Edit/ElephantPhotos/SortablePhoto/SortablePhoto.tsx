import { useSortable } from '@dnd-kit/sortable'
import styles from './SortablePhoto.module.scss'
import { CSS } from '@dnd-kit/utilities'
import { PhotoFormData } from '../../../../../types'

export default function SortablePhoto({ photo }: { photo: PhotoFormData }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img src={photo.thumbnail_url} alt={`Photo ${photo.id}`} className={styles.photo} />
        </div>
    )
}