import { useFetcher, Link } from 'react-router-dom'
import { useState } from 'react'

function NewNavBar() {
    const fetcher = useFetcher()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        fetcher.submit(
            { email, password },
            { method: 'post', action: '/login' }
        )
    }

    return (
        <nav>
            <Link to="/elephants">Elephants</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {fetcher.state === 'loading' && <p>Logging in...</p>}
            {fetcher.data && fetcher.data.success && <p>Login successful!</p>}
            {fetcher.data && !fetcher.data.success && <p>Login failed. Please try again.</p>}
        </nav>
    )
}

export default NewNavBar