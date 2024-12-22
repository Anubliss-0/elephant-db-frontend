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
import Input from '../../../components/Inputs/Input.tsx'
import PageContainer from '../../../components/PageContainer/PageContainer'

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

type EditProps = {
    editMode: boolean
}

function Edit({ editMode }: EditProps) {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const fetcher = useFetcher()
    const location = useLocation()
    const [elephant, setElephant] = useState<Elephant | null>(null)
    const [photos, setPhotos] = useState<PhotoFormData[]>([])
    const [currentName, setCurrentName] = useState('')
    const fileInputId = useId()

    useEffect(() => {
        if (editMode) {
            const { elephant } = location.state
            setElephant(elephant)
            setCurrentName(elephant.name)
        } else {
            setElephant(null)
        }
    }, [editMode, location.state])

    useEffect(() => {
        if (elephant) {
            setPhotos(mapPhotos(elephant.photos))
        }
    }, [elephant])

    const mapPhotos = (photos: PhotoFormData[]) => 
        photos.map(photo => ({
            id: photo.id,
            status: '',
            position: photo.position,
            image: null,
            thumbnail_url: photo.thumbnail_url,
            previous_position: photo.position
        }))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        appendPhotosToFormData(formData, photos)
        fetcher.submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
    }

    const appendPhotosToFormData = (formData: FormData, photos: PhotoFormData[]) => {
        photos.forEach((photo, index) => {
            formData.append(`elephant[photos_attributes][${index}][id]`, photo.id.toString())
            formData.append(`elephant[photos_attributes][${index}][position]`, photo.position.toString())
            formData.append(`elephant[photos_attributes][${index}][status]`, photo.status)
            if (photo.image) {
                formData.append(`elephant[photos_attributes][${index}][image]`, photo.image)
            }
        })
    }

    const getClassNames = (baseClass: string) => classNames(baseClass, styles[theme])

    return (
        <PageContainer>
            <div className={getClassNames(styles.edit)}>
                <h1>{editMode ? `${t('elephants.editing')} ${currentName}` : t('elephants.creating')}</h1>
                <fetcher.Form onSubmit={handleSubmit} className={styles.editFormGrid}>
                    <div className={getClassNames(styles.detailsGridArea)}>
                        <ElephantDetailFields
                            currentName={currentName}
                            setCurrentName={setCurrentName}
                            age={elephant?.age || 0}
                            species={elephant?.species || ''}
                            gender={elephant?.gender || ''}
                            habitat={elephant?.habitat || ''}
                        />
                    </div>
                    <div className={getClassNames(styles.photosGridArea)}>
                        <ElephantPhotos
                            photos={photos}
                            fileInputId={fileInputId}
                            setPhotos={setPhotos}
                        />
                    </div>
                    <div className={getClassNames(styles.bioGridArea)}>
                        <Input name="elephant[bio]" label={t('elephants.bio')} type="textarea" defaultValue={elephant?.bio || ''} required />
                    </div>
                    <Button type="submit">{t(editMode ? 'elephants.save' : 'elephants.create')}</Button>
                </fetcher.Form>
            </div>
        </PageContainer>
    )
}

export default Edit