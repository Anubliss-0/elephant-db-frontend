import { useEffect } from 'react';
import { getCookie, setToken } from '../utils/auth';
import { useUser } from '../contexts/UserContext';

const UserLoader: React.FC = () => {
    const { setUserName } = useUser();

    useEffect(() => {
        const token = getCookie('token');
        const userName = getCookie('user_name');

        if (token) {
            setToken(token);
        }

        setUserName(userName);
    }, [setUserName]);

    return null; // This component doesn't render anything
};

export default UserLoader; 