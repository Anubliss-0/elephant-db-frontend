import { useState } from 'react'
import styles from "./ProfilePhotoUpload.module.scss"
import classNames from 'classnames'
import { useTheme } from '../../../../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import Button from '../../../../components/Button/Button'

interface ProfilePhotoUploadProps {
    imageUrl: string
}

function ProfilePhotoUpload({ imageUrl }: ProfilePhotoUploadProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(imageUrl)
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
        <div className={styles.photoUpload}>
            <label htmlFor="profileImageInput">
                {t('profiles.profile_photo')}
            </label>
            <div className={classNames(styles.inputContainer, styles[theme])}>
                <div className={styles.imagePreview}>
                    {imageSrc && <img src={imageSrc} alt="Profile Preview" />}
                </div>
                <input
                    type="file"
                    id="profileImageInput"
                    name="profile[profileimage]"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.hiddenInput}
                />
                <Button
                    type="button"
                    className={styles.uploadButton}
                    onClick={() => document.getElementById('profileImageInput')?.click()}
                >
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default ProfilePhotoUpload