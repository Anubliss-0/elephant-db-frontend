import { Link } from "react-router-dom"
import styles from "./NavBar.module.scss"

function NavBar() {
    return (
        <div className={styles.navBar}>
            <Link to={'/login'}>Login</Link>
            <Link to={'/new_elephant'}>Add Elephant</Link>
            <Link to={'/elephants'}>Elephants</Link>
        </div>
    )
}

export default NavBar