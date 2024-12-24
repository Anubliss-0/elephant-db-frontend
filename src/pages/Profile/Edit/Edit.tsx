import { useLocation, useFetcher } from "react-router-dom"
import styles from "./Edit.module.scss"
import Input from "../../../components/Inputs/Input"
import Button from "../../../components/Button/Button"
import ProfilePhotoUpload from "./ProfilePhotoUpload/ProfilePhotoUpload"
import { useTranslation } from "react-i18next"

type ProfileShowData = {
    user_id: string
    name: string
    gender: string
    location: string
    profileimage_url: string
    elephants_count: number
    created_at: string
    can_edit: boolean
}

function Edit() {
    const { profile } = useLocation().state as { profile: ProfileShowData }
    const fetcher = useFetcher()
    const { t } = useTranslation()

    return (
        <div className={styles.edit}>
            <h1>{t('profiles.edit')}</h1>
            <fetcher.Form method="PATCH" encType="multipart/form-data" className={styles.form}>
                <div className={styles.info}>
                    <Input name="profile[name]" label={t('profiles.name')} type="text" defaultValue={profile.name} required />
                    <Input name="profile[gender]" label={t('profiles.gender')} type="text" defaultValue={profile.gender} required />
                    <Input name="profile[location]" label={t('profiles.location')} type="text" defaultValue={profile.location} required />
                </div>
                <div className={styles.image}>
                    <ProfilePhotoUpload />
                </div>
                <div className={styles.submit}>
                    <Button type="submit">{t('profiles.save')}</Button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default Edit