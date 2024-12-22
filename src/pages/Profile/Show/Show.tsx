import PageContainer from "../../../components/PageContainer/PageContainer"
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
        <PageContainer>
            <div className={styles.show}>
                <div className={styles.profileHeader}>
                    <h1>{profile.name}</h1>
                    {profile.can_edit && <Button to={`/profiles/${profile.user_id}/edit`} state={{ profile: profile }}>{t('profiles.edit')}</Button>}
                </div>
                <div className={styles.profileGrid}>
                    <div className={styles.profileDetails}>
                        <label>{t('profiles.gender')}
                            <p>{profile.gender}</p>
                        </label>
                        <label>{t('profiles.location')}
                            <p>{profile.location}</p>
                        </label>
                        <label>{t('profiles.elephants_count')}
                            <p>{profile.elephants_count}</p>
                        </label>
                        <label>{t('profiles.member_since')}
                            <p>{formattedDate}</p>
                        </label>
                    </div>
                    <div className={styles.profileImage}>
                        <label>{t('profiles.profile_image')}
                            <img src={profile.profileimage_url} alt={profile.name} />
                        </label>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Show