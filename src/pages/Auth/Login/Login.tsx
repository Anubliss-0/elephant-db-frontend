import Input from '../../../components/Inputs/Input'
import Button from '../../../components/Button/Button'
import styles from './Login.module.scss'
import { useFetcher } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
function Login() {
    const fetcher = useFetcher()
    const { t } = useTranslation()

    return (
        <div className={styles.login}>
            <h1>{t('sessions.login')}</h1>
            <fetcher.Form method="post" className={styles.loginForm}>
                <Input type="text" name="email" label={t('sessions.email')} placeholder={t('sessions.email')} />
                <Input type="password" name="password" label={t('sessions.password')} placeholder={t('sessions.password')} />
                <Button type="submit">{t('sessions.login')}</Button>
            </fetcher.Form>
        </div>
    )
}

export default Login