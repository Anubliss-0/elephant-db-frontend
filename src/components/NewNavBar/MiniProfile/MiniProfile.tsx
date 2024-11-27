import { useUser } from "../../../contexts/UserContext"
import { useTheme } from "../../../contexts/ThemeContext"
import { FetcherWithComponents, Link } from "react-router-dom"
import styles from './MiniProfile.module.scss'
import classNames from "classnames"
interface MiniProfileProps {
    fetcher: FetcherWithComponents<any>;
}

function MiniProfile({ fetcher }: MiniProfileProps) {
    const { user } = useUser()
    const { theme, toggleTheme } = useTheme()
    
    return (
        <>
            <div className={classNames(styles.modal, styles[theme])}>
                <Link to={`/profiles/${user.profileId}`}>{user.userName}</Link>
                {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
                <div className={styles.themeToggle}>
                    <button onClick={toggleTheme}>Toggle Theme</button>
                </div>
                <fetcher.Form method="post" action="/logout">
                    <button type="submit">Logout</button>
                </fetcher.Form>
            </div>
        </>
    )
}

export default MiniProfile