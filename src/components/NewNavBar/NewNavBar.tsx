import { useFetcher, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../contexts/UserContext'
import Login from './Login/Login'
import MiniProfile from './MiniProfile/MiniProfile'
import styles from './NewNavBar.module.scss'
import Logo from '../../assets/epdb-logo.svg?react'
import UserIcon from '../../assets/user.svg?react'
import classNames from 'classnames'
import { useTheme } from '../../contexts/ThemeContext'

function NewNavBar() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const { user, setUser } = useUser();
    const { theme } = useTheme()
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const themedClass = (baseClass: string) => classNames(baseClass, styles[theme]);

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
            if (
                modalRef.current && 
                !modalRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowModal(prev => !prev);
    };

    return (
        <nav className={themedClass(styles.nav)}>
            <div className={styles.leftSide}>
                <div className={styles.logoContainer}>
                    <Logo className={styles.logo} />
                    <span className={styles.logoText}>EPDB</span>
                </div>
            </div>

            <div className={themedClass(styles.rightSide)}>
                <Link className={themedClass(styles.navLink)} to="/elephants">{t('navBar.exploreElephants')}</Link>
                <Link className={themedClass(styles.navLink)} to="/new_elephant">{t('navBar.addElephant')}</Link>

                {user.userName && (
                    <div className={themedClass(styles.navLink)}>
                        <button
                            className={styles.profileButton}
                            onClick={handleButtonClick}
                            ref={buttonRef}
                        >
                            <img src={user.profileImageUrl} alt="Profile" />
                        </button>
                    </div>
                )}
                {!user.userName && (
                    <div className={themedClass(styles.navLink)}>
                        <button
                            className={styles.profileButton}
                            onClick={handleButtonClick}
                            ref={buttonRef}
                        >
                            <UserIcon className={styles.userIcon} />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.modalContainer} ref={modalRef}>
                {user.userName && showModal && <MiniProfile fetcher={fetcher} />}
                {!user.userName && showModal && <Login fetcher={fetcher} />}
            </div>
        </nav>
    )
}

export default NewNavBar