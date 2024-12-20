import { useState, useId } from "react"
import { Form, useSubmit } from "react-router-dom"
import classNames from 'classnames'
import styles from './ElephantManagement.module.scss'
import { useTheme } from "../../../contexts/ThemeContext"
import ElephantPhotos from "./ElephantPhotos/Elephantphotos"
import { PhotoFormData } from "../../../types"
import ElephantDetailFields from "./ElephantDetailFields/ElephantDetailFields"
import { useTranslation } from "react-i18next"

function New() {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const submit = useSubmit()
    const [photos, setPhotos] = useState<PhotoFormData[]>([])
    const fileInputId = useId()
    const [currentName, setCurrentName] = useState('')

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

        submit(formData, { method: 'POST', encType: 'multipart/form-data' })
    }

    const containerClasses = classNames(
        styles.edit,
        styles[theme],
        'desktopContainer',
        { dark: theme === 'dark' }
    )

    return (
        <div className={containerClasses}>
            <h1>{t('elephants.creating')} {currentName}</h1>
            <Form onSubmit={handleSubmit} className={styles.editForm}>
                <ElephantDetailFields
                    currentName={currentName}
                    setCurrentName={setCurrentName}
                    age={0}
                    species={''}
                    gender={''}
                    habitat={''}
                />
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
                        <textarea name="elephant[bio]" />
                    </label>
                </div>
                <button type="submit" className={classNames(styles.saveButton, styles[theme])}>{t('elephants.save')}</button>
            </Form>
        </div>
    )
}

export default New