import { useFetcher, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../../contexts/UserContext'
import Login from './Login/Login'

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

            {!user.userName && <Login fetcher={fetcher} />}

            {user.userName && <p>Welcome, {user.userName}!</p>}
            {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
        </nav>
    )
}

export default NewNavBar