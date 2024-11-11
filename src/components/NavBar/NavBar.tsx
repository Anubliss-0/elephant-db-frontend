import { useState } from 'react'
import { Link } from "react-router-dom"
import styles from "./NavBar.module.scss"
import Login from "../Auth/Login/Login"
import { handleLogin, handleLogout } from '../../utils/auth'
import ErrorPage from '../../ErrorPage'
import { useUser } from '../../contexts/UserContext'
import UserProfile from './UserProfile/UserProfile'

function NavBar() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [error, setError] = useState(null)
    const { setUserName, setUserId, userId } = useUser()

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal)
    }

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile)
    }

    return (
        <div className={styles.navBar}>
            {!userId && (
                <button onClick={toggleLoginModal}>Login</button>
            )}
            {userId && (
                <button onClick={toggleUserProfile}>Profile</button>
            )}
            <Link to={'/new_elephant'}>Add Elephant</Link>
            <Link to={'/elephants'}>Elephants</Link>
            {showLoginModal && (
                <div className="modal">
                    <Login onSubmit={(formData) => handleLogin(formData, setUserName, setUserId, setShowLoginModal, setError)} />
                    {error && <ErrorPage />}
                </div>
            )}
            {showUserProfile && (
                <div className="modal">
                    <UserProfile onLogout={() => handleLogout(setUserName, setUserId, setShowUserProfile)} />
                </div>
            )}
        </div>
    )
}

export default NavBar