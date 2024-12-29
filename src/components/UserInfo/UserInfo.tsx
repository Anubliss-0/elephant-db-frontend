import { useUser } from '../../contexts/UserContext'
import { useTheme } from '../../contexts/ThemeContext'
import classNames from 'classnames'
import styles from './UserInfo.module.scss'
import { Form, Link } from 'react-router-dom'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'

function UserInfo() {
    const { user, isUserInfoOpen, setIsUserInfoOpen } = useUser()
    const { theme, toggleTheme } = useTheme()
    const [backgroundOpen, setBackgroundOpen] = useState(false)
    const [miniProfileOpen, setMiniProfileOpen] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMiniProfileOpen(isUserInfoOpen)
            setBackgroundOpen(isUserInfoOpen)
        }, 200)

        return () => clearTimeout(timeout)
    }, [isUserInfoOpen])

    const handleCloseUserInfo = () => {
        setMiniProfileOpen(false)
        setTimeout(() => {
            setBackgroundOpen(false)
            setIsUserInfoOpen(false)
        }, 200)
    }

    return (
        <>
            <div
                className={classNames(styles.background, styles[theme], { [styles.open]: backgroundOpen })}
                onClick={handleCloseUserInfo}
            >
            </div>
            <div className={classNames(styles.miniProfile, styles[theme], { [styles.open]: miniProfileOpen })}>
                {user && (
                    <>
                        <span>{user.name}</span>
                        <img src={user.profileimage_url} alt={user.name} />
                        <Link to={`/profiles/${user.id}`} onClick={handleCloseUserInfo}>View Profile</Link>
                    </>
                )}
                <div className={styles.themeToggle}>
                    <Toggle icons={false} onChange={toggleTheme} />
                </div>
                {!user && (
                    <>
                        <Button type="button" to="/login" onClick={handleCloseUserInfo}>Login</Button>
                        <Link to="/signup" onClick={handleCloseUserInfo}>Signup</Link>
                    </>
                )}
                {user && (
                    <Form method="post">
                        <Button type="submit" onClick={handleCloseUserInfo}>Logout</Button>
                    </Form>
                )}
            </div>
        </>
    )
}

export default UserInfo