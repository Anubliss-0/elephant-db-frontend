import { useState } from 'react'
import styles from "./ProfilePhotoUpload.module.scss"
import classNames from 'classnames'
import { useTheme } from '../../../../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import Button from '../../../../components/Button/Button'

function ProfilePhotoUpload() {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const { theme } = useTheme()
    const { t } = useTranslation()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <label className={styles.photoUploadContainer}>
            {t('profiles.profile_photo')}
            <div className={classNames(styles.photoUpload, styles[theme])}>
                <div className={styles.imagePreview}>
                    {imageSrc && <img src={imageSrc} alt="Profile Preview" />}
                </div>
                <input
                    type="file"
                    id="profileImageInput"
                    name="profile[profileimage]"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.imageInput}
                />
                <div className={styles.uploadButtonContainer}>
                    <Button
                        type="button"
                        className={styles.uploadButton}
                        onClick={() => document.getElementById('profileImageInput')?.click()}
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </label>
    )
}

export default ProfilePhotoUpload