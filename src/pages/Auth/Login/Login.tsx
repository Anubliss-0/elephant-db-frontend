import Input from '../../../components/Inputs/Input'
import Button from '../../../components/Button/Button'
import styles from './Login.module.scss'
import { Form } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Login() {
    const { t } = useTranslation()

    return (
        <div className={styles.login}>
            <h1>{t('sessions.login')}</h1>
            <Form method="post" className={styles.loginForm}>
                <Input type="text" name="user[email]" label={t('sessions.email')} placeholder={t('sessions.email')} />
                <Input type="password" name="user[password]" label={t('sessions.password')} placeholder={t('sessions.password')} />
                <Button type="submit">{t('sessions.login')}</Button>
            </Form>
        </div>
    )
}

export default Login