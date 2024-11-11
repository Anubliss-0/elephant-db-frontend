import { useUser } from '../../../contexts/UserContext'

function UserProfile({ onLogout }: { onLogout: () => void }) {
    const { userName } = useUser()
    return (
        <div>
            <h1>{userName}</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}

export default UserProfile