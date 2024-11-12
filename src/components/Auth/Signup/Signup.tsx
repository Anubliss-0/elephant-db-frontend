import { useNavigate } from "react-router-dom"
import { useUser } from "../../../contexts/UserContext"
import { getUserCookies, handleSignup } from "../../../utils/auth"

function Signup() {
    const navigate = useNavigate()
    const { setUserName, setUserId, setProfileId } = useUser()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData)
        await handleSignup(formData)
        const user = getUserCookies()
        if (user) {
            setUserName(user.profile.name)
            setUserId(user.id)
            setProfileId(user.profile.id)
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="user[email]" placeholder="email" required />
                <input type="text" name="user[profile_attributes][name]" placeholder="name" required />
                <input type="text" name="user[profile_attributes][gender]" placeholder="gender" required />
                <input type="text" name="user[profile_attributes][location]" placeholder="location" required />
                <input type="password" name="user[password]" placeholder="password" required />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup