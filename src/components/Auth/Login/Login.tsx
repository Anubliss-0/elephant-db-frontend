import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'

function Login({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        onSubmit(formData)
    }

    return (
        <div className={styles.modal}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
    )
}

export default Login