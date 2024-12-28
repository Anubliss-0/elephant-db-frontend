import { Link } from 'react-router-dom'
import Logo from '../../assets/epdb-logo.svg?react'
import UserIcon from '../../assets/user.svg?react'
import { useUser } from '../../contexts/UserContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import styles from './NavBar.module.scss'

function NavBar() {
    const { user, setIsUserInfoOpen } = useUser()
    const { theme } = useTheme()
    const { t } = useTranslation()

    return (
        <div className={classNames(styles.nav, styles[theme])}>
            <Link className={styles.logoContainer} to="/elephants">
                <Logo className={styles.logo} />
                <span className={styles.logoText}>EPDB</span>
            </Link>
            <div className={classNames(styles.linksContainer, styles[theme])}>
                <Link className={classNames(styles.navLink, styles[theme])} to="/elephants">{t('navBar.exploreElephants')}</Link>
                <Link className={classNames(styles.navLink, styles[theme])} to="/new_elephant">{t('navBar.addElephant')}</Link>
                <button className={classNames(styles.profileButton, styles[theme])} onClick={() => {setIsUserInfoOpen(true)}}>
                    {user?.profileimage_url ? <img src={user.profileimage_url} alt={user.name} /> : <UserIcon />}
                </button>
            </div>
        </div>
    )
}

export default NavBar