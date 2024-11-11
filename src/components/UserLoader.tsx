import { useEffect } from 'react'
import { getCookie, setToken } from '../utils/auth'
import { useUser } from '../contexts/UserContext'

const UserLoader: React.FC = () => {
    const { setUserName, setUserId } = useUser()

    useEffect(() => {
        const token = getCookie('token')
        const userName = getCookie('user_name')
        const userId = getCookie('user_id')

        if (token) {
            setToken(token)
        }

        setUserName(userName)
        setUserId(Number(userId))
    }, [setUserName, setUserId])

    return null
}

export default UserLoader