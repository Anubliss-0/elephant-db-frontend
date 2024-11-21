import { useFetcher, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import Login from './Login/Login'
import MiniProfile from './Login/MiniProfile/MiniProfile'

function NewNavBar() {
    const fetcher = useFetcher()
    const { user, setUser } = useUser()
    const [showLogin, setShowLogin] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('profileData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        else {
            setUser({
                userName: null,
                profileId: null,
                userId: null,
                profileImageUrl: null,
            })
        }
    }, [fetcher.state]);

    return (
        <nav>
            <Link to="/elephants">Elephants</Link>
            <Link to="/new_elephant">New Elephant</Link>

            {!user.userName && (
                <button onClick={() => setShowLogin(prev => !prev)}>
                    {showLogin ? 'Hide Login' : 'Login'}
                </button>
            )}

            {!user.userName && showLogin && <Login fetcher={fetcher} />}

            {user.userName && (
                <button onClick={() => setShowProfile(prev => !prev)}>
                    {showProfile ? 'Hide Profile' : 'Show Profile'}
                </button>
            )}

            {user.userName && showProfile && <MiniProfile fetcher={fetcher} />}
        </nav>
    )
}

export default NewNavBar