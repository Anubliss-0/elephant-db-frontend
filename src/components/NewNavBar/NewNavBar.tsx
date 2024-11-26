import { useFetcher, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import Login from './Login/Login'
import MiniProfile from './MiniProfile/MiniProfile'
import styles from './NewNavBar.module.scss'
import Logo from '../../assets/epdb-logo.svg?react'

function NewNavBar() {
    const fetcher = useFetcher();
    const { user, setUser } = useUser();
    const [showLogin, setShowLogin] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

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

        if (showProfile) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfile]);

    return (
        <nav className={styles.nav}>
            <div className={styles.logoContainer}>
                <Logo className={styles.logo} />
                <span className={styles.logoText}>EPDB</span>
            </div>
            {!user.userName && showLogin && <Login fetcher={fetcher} />}

            {user.userName && (
                <button onClick={() => setShowProfile(true)}>
                    Show Profile
                </button>
            )}
    
            <Link to="/elephants">Elephants</Link>
            <Link to="/new_elephant">New Elephant</Link>

            {!user.userName && (
                <button onClick={() => setShowLogin(prev => !prev)}>
                    {showLogin ? 'Hide Login' : 'Login'}
                </button>
            )}

            {user.userName && showProfile && (
                <div ref={profileRef}>
                    <MiniProfile fetcher={fetcher} />
                </div>
            )}
        </nav>
    )
}

export default NewNavBar