import { FetcherWithComponents, Link } from 'react-router-dom'
import styles from './Login.module.scss'

interface LoginProps {
    fetcher: FetcherWithComponents<any>;
}

function Login({ fetcher }: LoginProps) {
    return (
        <div className={styles.modal}>
            <fetcher.Form method="post" action="/login">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </fetcher.Form>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default Login