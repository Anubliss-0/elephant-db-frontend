import { useUser } from "../../../../contexts/UserContext"

function MiniProfile() {
    const { user } = useUser()
    return (
        <>
            {user.userName}
            {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
        </>
    )
}

export default MiniProfile