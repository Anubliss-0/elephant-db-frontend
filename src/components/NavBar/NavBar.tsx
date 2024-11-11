import { useState } from 'react'
import { Link } from "react-router-dom"
import styles from "./NavBar.module.scss"
import Login from "../Auth/Login/Login"
import { loginUser, logOutUser } from '../../utils/api'
import { removeUserCookies, setUserCookies } from '../../utils/auth'
import ErrorPage from '../../ErrorPage'
import { useUser } from '../../contexts/UserContext'
import UserProfile from './UserProfile/UserProfile'

function NavBar() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [error, setError] = useState(null)
    const { setUserName, setUserId, userId } = useUser()

    const handleLogin = async (formData) => {
        try {
            const userData = new FormData()
            formData.forEach((value, key) => {
                userData.append(`user[${key}]`, value)
            })

            const response = await loginUser(userData)
            const jwtToken = response.headers.authorization.split(' ')[1]
            const user = response.data.data.profile
            setUserCookies(jwtToken, user)
            setUserName(user.name)
            setUserId(user.id)
            setShowLoginModal(false)
        } catch (err) {
            setError(err)
        }
    }

    const handleLogout = async () => {
        await logOutUser()
        removeUserCookies()
        setUserName(null)
        setUserId(null)
        setShowUserProfile(false)
    }

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
                    <Login onSubmit={handleLogin} />
                    {error && <ErrorPage />}
                </div>
            )}
            {showUserProfile && (
                <div className="modal">
                    <UserProfile onLogout={handleLogout} />
                </div>
            )}
        </div>
    )
}

export default NavBar