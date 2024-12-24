import { useLoaderData } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./Show.module.scss"
import Button from "../../../components/Button/Button"

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

function Show() {
    const { profile } = useLoaderData() as { profile: ProfileShowData }
    const { t } = useTranslation()
    const formattedDate = new Date(profile.created_at).toLocaleDateString()
    console.log(profile)

    return (
        <div className={styles.show}>
            <div className={styles.profileHeader}>
                <h1>{profile.name}</h1>
                {profile.can_edit && <Button to={`/profiles/${profile.user_id}/edit`} state={{ profile: profile }}>{t('profiles.edit')}</Button>}
            </div>
            <div>
                <div className={styles.profileDetails}>
                    <div className={styles.profileDetail}>
                        <strong>{t('profiles.gender')}</strong>
                        <p>{profile.gender}</p>
                    </div>
                    <div className={styles.profileDetail}>
                        <strong>{t('profiles.location')}</strong>
                        <p>{profile.location}</p>
                    </div>
                    <div className={styles.profileDetail}>
                        <strong>{t('profiles.elephants_count')}</strong>
                        <p>{profile.elephants_count}</p>
                    </div>
                    <div className={styles.profileDetail}>
                        <strong>{t('profiles.member_since')}</strong>
                        <p>{formattedDate}</p>
                    </div>
                </div>
            </div>
            <div className={styles.profileImage}>
                <strong>{t('profiles.profile_image')}</strong>
                <img src={profile.profileimage_url} alt={profile.name} />
            </div>
        </div>
    )
}

export default Show