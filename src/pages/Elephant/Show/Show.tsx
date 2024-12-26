import { useLoaderData } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import { useTranslation } from 'react-i18next'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import styles from './Show.module.scss'
import Button from '../../../components/Button/Button.tsx'
import classNames from 'classnames'

type Photo = {
    id: number
    original_url: string
    thumbnail_url: string
    medium_url: string
    position: number
}

type Elephant = {
    id: string
    name: string
    species: string
    gender: string
    habitat: string
    bio: string
    user_id: number
    age: number
    photos: Photo[]
    profile_id: number
    can_edit: boolean | null
    user_name: string
    user_profile_image_url: string
    created_at: string
    updated_at: string
}

type ImageGalleryItem = {
    original: string
    thumbnail: string
    fullscreen: string
    loading: 'lazy' | 'eager' | undefined
}

function Show() {
    const { elephant } = useLoaderData() as { elephant: Elephant }
    const { t } = useTranslation()

    const images: ImageGalleryItem[] = elephant.photos.map(photo => ({
        original: photo.medium_url,
        thumbnail: photo.thumbnail_url,
        fullscreen: photo.original_url,
        loading: 'eager',
    }))

    return (
        <div className={styles.show}>
            <div className={styles.header}>
                <h1>{elephant.name}</h1>
                {elephant.can_edit && <Button to={`/elephants/${elephant.id}/edit`} state={{ elephant: elephant }}>{t('elephants.edit')}</Button>}
            </div>
            <div className={styles.details}>
                <div className={styles.detail}>
                    <strong>{t('elephants.species')}</strong>
                    <span>{elephant.species}</span>
                </div>
                <div className={styles.detail}>
                    <strong>{t('elephants.habitat')}</strong>
                    <span>{elephant.habitat}</span>
                </div>
                <div className={styles.detail}>
                    <strong>{t('elephants.age')}</strong>
                    <span>{elephant.age}</span>
                </div>
                <div className={styles.detail}>
                    <strong>{t('elephants.gender')}</strong>
                    <span>{elephant.gender}</span>
                </div>
            </div>
            <div className={styles.photos}>
                <ImageGallery items={images} showThumbnails={false} showPlayButton={false} />
            </div>
            <div className={classNames(styles.bio, styles.detail)}>
                <strong>{t('elephants.bio')}:</strong>
                <p>{elephant.bio}</p>
            </div>
        </div>
    )
}

export default Show
