import { useLoaderData, Link, useFetcher } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import styles from './Show.module.scss'

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

function NewShow() {
    const { elephant } = useLoaderData() as { elephant: Elephant }
    const { t } = useTranslation()
    const fetcher = useFetcher()

    const images: ImageGalleryItem[] = elephant.photos.map(photo => ({
        original: photo.medium_url,
        thumbnail: photo.thumbnail_url,
        fullscreen: photo.original_url,
        loading: 'eager',
    }))

    return (
        <div className={styles.show}>
            <div className={styles.top}>
                <div className={styles.topInfo}>
                    <h1>{elephant.name}</h1>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.species')}:</h3>
                        <p>{elephant.species}</p>
                    </div>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.habitat')}:</h3>
                        <p>{elephant.habitat}</p>
                    </div>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.age')}:</h3>
                        <p>{elephant.age}</p>
                    </div>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.gender')}:</h3>
                        <p>{elephant.gender}</p>
                    </div>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.createdAt')}:</h3>
                        <p>{elephant.created_at}</p>
                    </div>
                    <div className={styles.topInfoItem}>
                        <h3>{t('elephants.updatedAt')}:</h3>
                        <p>{elephant.updated_at}</p>
                    </div>
                    <div className={styles.userInfo}>
                        <h3>{t('elephants.creator')}:</h3>
                        <Link to={`/profiles/${elephant.profile_id}`} className={styles.userInfoLink}>
                            <p>{elephant.user_name}</p>
                            {elephant.user_profile_image_url && <img src={elephant.user_profile_image_url} alt={`${elephant.user_name}'s profile`} />}
                        </Link>
                    </div>
                    {elephant.can_edit && (
                        <div className={styles.editContainer}>
                            <Link to={`/elephants/${elephant.id}/edit`} state={{ elephant: elephant }} className={styles.editLink}>{t('elephants.edit')}</Link>
                            <fetcher.Form method="DELETE" className={styles.deleteForm}>
                                <button type="submit">{t('elephants.delete')}</button>
                            </fetcher.Form>
                        </div>
                    )}
                </div>
                <ImageGallery items={images} thumbnailPosition='right' showPlayButton={false} />
            </div>
            <div className={styles.bio}>
                <h2>{t('elephants.bio')}:</h2>
                <p>{elephant.bio}</p>
            </div>
        </div>
    )
}

export default NewShow