import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'
import styles from './UserProfile.module.scss'

function UserProfile({ onLogout }: { onLogout: () => void }) {
    const { userName, userId } = useUser()
    return (
        <div className={styles.modal}>
            <h1>{userName}</h1>
            <button onClick={onLogout}>Logout</button>
            <Link to={`/profiles/${userId}`}>View Profile</Link>
        </div>
    )
}

export default UserProfile