import { useUser } from "../../../contexts/UserContext"
import { useTheme } from "../../../contexts/ThemeContext"
import { FetcherWithComponents, Link } from "react-router-dom"
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
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
                <Link to={`/profiles/${user.profileId}`}>
                    {user.userName}
                    {user.profileImageUrl && <img className={styles.profileImage} src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
                    <span>View Profile</span>
                </Link>
                <div className={styles.themeToggle}>
                    <Toggle icons={false} onChange={toggleTheme} />
                </div>
                <fetcher.Form method="post" action="/logout">
                    <button type="submit">Logout</button>
                </fetcher.Form>
            </div>
        </>
    )
}

export default MiniProfile