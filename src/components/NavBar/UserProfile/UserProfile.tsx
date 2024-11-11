import { useUser } from '../../../contexts/UserContext'

function UserProfile() {
    const { userName } = useUser()
    return (
        <div>
            <h1>{userName}</h1>
        </div>
    )
}

export default UserProfile