import { useUser } from "../../../contexts/UserContext"
import { FetcherWithComponents, Link } from "react-router-dom"
import styles from './MiniProfile.module.scss'

interface MiniProfileProps {
    fetcher: FetcherWithComponents<any>;
}

function MiniProfile({ fetcher }: MiniProfileProps) {
    const { user } = useUser()

    return (
        <>
            <div className={styles.modal}>
                <Link to={`/profiles/${user.profileId}`}>{user.userName}</Link>
                {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
                <fetcher.Form method="post" action="/logout">
                    <button type="submit">Logout</button>
                </fetcher.Form>
            </div>
        </>
    )
}

export default MiniProfile