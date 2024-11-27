import { useFetcher, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../contexts/UserContext'
import Login from './Login/Login'
import MiniProfile from './MiniProfile/MiniProfile'
import styles from './NewNavBar.module.scss'
import Logo from '../../assets/epdb-logo.svg?react'
import classNames from 'classnames'

function NewNavBar() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const { user, setUser } = useUser();
    const [showLogin, setShowLogin] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('profileData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        else {
            setUser({
                userName: undefined,
                profileId: undefined,
                userId: undefined,
                profileImageUrl: undefined,
            })
        }
    }, [fetcher.state]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className={styles.nav}>
            <div className={styles.leftSide}>
                <div className={styles.logoContainer}>
                    <Logo className={styles.logo} />
                    <span className={styles.logoText}>EPDB</span>
                </div>
            </div>

            <div className={styles.rightSide}>
                <Link className={styles.navLink} to="/elephants">{t('navBar.exploreElephants')}</Link>
                <Link className={styles.navLink} to="/new_elephant">{t('navBar.addElephant')}</Link>
                {!user.userName && showLogin && <Login fetcher={fetcher} />}

                {user.userName && (
                    <div className={styles.navLink}>
                        <button
                            className={styles.profileButton}
                            onClick={() => setShowProfile(prev => !prev)}
                        >
                            <img src={user.profileImageUrl} alt="Profile" />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.modalContainer}>
                {!user.userName && (
                    <button onClick={() => setShowLogin(prev => !prev)}>
                        {showLogin ? 'Hide Login' : 'Login'}
                    </button>
                )}

                {user.userName && showProfile && (
                    <div ref={profileRef} className={styles.miniProfileContainer}>
                        <MiniProfile fetcher={fetcher} />
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NewNavBar