import { useLoaderData, Link } from 'react-router-dom'
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

    const images: ImageGalleryItem[] = elephant.photos.map(photo => ({
        original: photo.medium_url,
        thumbnail: photo.thumbnail_url,
        fullscreen: photo.original_url,
        loading: 'eager',
    }))
    
    return (
        <div className={styles.show}>
            <div className={styles.showHeader}>
                <div className={styles.showHeaderInfo}> 
                    <h1>{elephant.name}</h1>
                    <div className={styles.showHeaderInfoItem}>
                        <h3>{t('elephants.species')}:</h3>
                        <p>{elephant.species}</p>
                    </div>
                    <div className={styles.showHeaderInfoItem}>
                        <h3>{t('elephants.habitat')}:</h3>
                        <p>{elephant.habitat}</p>
                    </div>
                    <div className={styles.showHeaderInfoItem}>
                        <h3>{t('elephants.age')}:</h3>
                        <p>{elephant.age}</p>
                    </div>
                    <div className={styles.showHeaderInfoItem}>
                        <h3>{t('elephants.gender')}:</h3>
                        <p>{elephant.gender}</p>
                    </div>
                    <div className={styles.userInfo}>
                        <h3>{t('elephants.creator')}:</h3>
                        <Link to={`/profiles/${elephant.profile_id}`} className={styles.userInfoLink}>
                            <p>{elephant.user_name}</p>
                            {elephant.user_profile_image_url && <img src={elephant.user_profile_image_url} alt={`${elephant.user_name}'s profile`} />}
                        </Link>
                    </div>
                    <Link to={`/elephants/${elephant.id}/edit`} state={{ elephant: elephant }} className={styles.editLink}>EDIT</Link>
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