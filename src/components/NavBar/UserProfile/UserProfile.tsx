import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'

function UserProfile({ onLogout }: { onLogout: () => void }) {
    const { userName, userId } = useUser()
    return (
        <div>
            <h1>{userName}</h1>
            <button onClick={onLogout}>Logout</button>
            <Link to={`/profiles/${userId}`}>View Profile</Link>
        </div>
    )
}

export default UserProfile