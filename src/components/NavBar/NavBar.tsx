import { Link } from "react-router-dom"
import styles from "./NavBar.module.scss"
import { useUser } from "../../contexts/UserContext"
function NavBar() {
    const { userName } = useUser()
    return (
        <div className={styles.navBar}>
            <span>{userName}</span>
            <Link to={'/login'}>Login</Link>
            <Link to={'/new_elephant'}>Add Elephant</Link>
            <Link to={'/elephants'}>Elephants</Link>
        </div>
    )
}

export default NavBar