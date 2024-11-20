import { useFetcher, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../../contexts/UserContext'

function NewNavBar() {
    const fetcher = useFetcher()
    const { user, setUser } = useUser()

    useEffect(() => {
        const storedUser = localStorage.getItem('profileData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [fetcher.state]);

    return (
        <nav>
            <Link to="/elephants">Elephants</Link>
            <Link to="/new_elephant">New Elephant</Link>

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
            {/* {fetcher.state === 'loading' && <p>Logging in...</p>}
            {fetcher.data && fetcher.data.success && <p>Login successful!</p>}
            {fetcher.data && !fetcher.data.success && <p>Login failed. Please try again.</p>} */}

            {user.userName && <p>Welcome, {user.userName}!</p>}
            {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
        </nav>
    )
}

export default NewNavBar