import { useState, useEffect, useId } from 'react'
import { useLocation, useFetcher } from 'react-router-dom'
import styles from './ElephantManagement.module.scss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { PhotoFormData } from '../../../types.ts'
import ElephantDetailFields from './ElephantDetailFields/ElephantDetailFields'
import ElephantPhotos from './ElephantPhotos/Elephantphotos.tsx'
import Button from '../../../components/Button/Button'
import { useTheme } from '../../../contexts/ThemeContext.tsx'

type Elephant = {
    id: string
    name: string
    species: string
    gender: string
    habitat: string
    bio: string
    user_id: number
    age: number
    photos: PhotoFormData[]
    profile_id: number
    can_edit: boolean | null
    user_name: string
    user_profile_image_url: string
}

function Edit() {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const fetcher = useFetcher()
    const location = useLocation()
    const elephant = location.state.elephant as Elephant
    const [photos, setPhotos] = useState<PhotoFormData[]>([])
    const [currentName, setCurrentName] = useState(elephant.name)
    const fileInputId = useId()

    useEffect(() => {
        setPhotos(elephant.photos.map((photo) => ({
            id: photo.id,
            status: '',
            position: photo.position,
            image: null,
            thumbnail_url: photo.thumbnail_url,
            previous_position: photo.position
        })))
    }, [elephant])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        photos.forEach((photo, index) => {
            formData.append(`elephant[photos_attributes][${index}][id]`, photo.id.toString())
            formData.append(`elephant[photos_attributes][${index}][position]`, photo.position.toString())
            formData.append(`elephant[photos_attributes][${index}][status]`, photo.status)
            if (photo.image) {
                formData.append(`elephant[photos_attributes][${index}][image]`, photo.image)
            }
        })

        fetcher.submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
    }

    const containerClasses = classNames(
        styles.edit,
        styles[theme],
        'desktopContainer',
        { dark: theme === 'dark' }
    )

    return (
        <div className={containerClasses}>
            <h1>{t('elephants.editing')} {currentName}</h1>
            <fetcher.Form onSubmit={handleSubmit} className={styles.editForm}>
                <div className={classNames(styles.detailsGridArea, styles[theme])}>
                    <ElephantDetailFields
                        currentName={currentName}
                        setCurrentName={setCurrentName}
                        age={elephant.age}
                        species={elephant.species}
                        gender={elephant.gender}
                        habitat={elephant.habitat}
                    />
                </div>
                <div className={classNames(styles.photosGridArea, styles[theme])} aria-label={t('elephants.photos')}>
                    {t('elephants.photos')}
                    <ElephantPhotos
                        photos={photos}
                        fileInputId={fileInputId}
                        setPhotos={setPhotos}
                    />
                </div>
                <div className={classNames(styles.bioGridArea, styles[theme])}>
                    <label>
                        {t('elephants.bio')}
                        <textarea name="elephant[bio]" defaultValue={elephant.bio} />
                    </label>
                </div>
                <Button type="submit">{t('elephants.save')}</Button>
            </fetcher.Form>
        </div>
    )
}

export default Edit