import { useNavigate } from "react-router-dom"
import { useUser } from "../../../contexts/UserContext"
import { handleSignup } from "../../../utils/auth"
import { getUserCookies } from "../../../utils/cookieManager"

function Signup() {
    const navigate = useNavigate()
    const { setUserName, setUserId, setProfileId, setProfileImageUrl } = useUser()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await handleSignup(formData)
        const user = getUserCookies()
        if (user) {
            setUserName(user.profile.name)
            setUserId(user.id)
            setProfileId(user.profile.id)
            setProfileImageUrl(user.profile.profileimage_url)
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="user[email]" placeholder="email" required />
                <input type="text" name="user[profile_attributes][name]" placeholder="name" required />
                <input type="text" name="user[profile_attributes][gender]" placeholder="gender"  />
                <input type="text" name="user[profile_attributes][location]" placeholder="location"  />
                <input type="file" name="user[profile_attributes][profileimage]" accept="image/*" />
                <input type="password" name="user[password]" placeholder="password" required />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup