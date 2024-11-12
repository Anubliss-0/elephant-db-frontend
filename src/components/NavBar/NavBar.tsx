import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import styles from "./NavBar.module.scss"
import Login from "../Auth/Login/Login"
import { getUserCookies, handleLogin, handleLogout } from '../../utils/auth'
import { useUser } from '../../contexts/UserContext'
import UserProfile from './UserProfile/UserProfile'

function NavBar() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const { setUserName, setProfileId, setUserId, profileId } = useUser()

    useEffect(() => {
        updateUserState()
    }, [])

    const updateUserState = (shouldClearState = false) => {
        if (shouldClearState) {
            setUserName(null)
            setProfileId(null)
            setUserId(null)
        }
        const user = getUserCookies()
        if (user) {
            setUserName(user.profile.name)
            setProfileId(user.profile.id)
            setUserId(user.id)
        }
    }

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal)
    }

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile)
    }

    const handleLoginSubmit = async (formData: FormData) => {
        await handleLogin(formData)
        const user = getUserCookies()
        if (user) {
            updateUserState()
            setShowLoginModal(false)
            setShowUserProfile(false)
        }
    }

    const handleLogoutSubmit = async () => {
        await handleLogout()
        updateUserState(true)
        setShowUserProfile(false)
    }

    return (
        <div className={styles.navBar}>
            {!profileId && (
                <button onClick={toggleLoginModal}>Login</button>
            )}
            {profileId && (
                <button onClick={toggleUserProfile}>Profile</button>
            )}
            <Link to={'/new_elephant'}>Add Elephant</Link>
            <Link to={'/elephants'}>Elephants</Link>
            {showLoginModal && (
                <div className="modal">
                    <Login onSubmit={handleLoginSubmit} />
                </div>
            )}
            {showUserProfile && (
                <div className="modal">
                    <UserProfile onLogout={handleLogoutSubmit} />
                </div>
            )}
        </div>
    )
}

export default NavBar