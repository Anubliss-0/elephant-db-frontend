import { useLoaderData } from "react-router-dom"
import ElephantCard from "../ElephantCard/ElephantCard"
import { useUser } from "../../../contexts/UserContext"
import { useEffect } from "react"
import { getCookie, setCookies } from "../../../utils/auth"

function Index() {
    const elephants = useLoaderData() as Array<{ id: string; attributes: { name: string, photo: string } }>
    const { setUserName } = useUser()

    // useEffect(() => {
    //     const token = getCookie('token')
    //     const userName = getCookie('user_name')
    //     const profileId = getCookie('profile_id')
    //     const userId = getCookie('user_id')

    //     if (token && userName && profileId && userId) {
    //         setCookies(token, { id: userId, profile: { id: profileId, name: userName } })
    //     }

    //     setUserName(userName)
    // }, [setUserName])
    
    return (
        <div>
            <h1>Elephants</h1>
                {elephants.map((elephant) => (
                    <ElephantCard key={elephant.id} elephant={elephant} />
                ))}
        </div>
    )
}

export default Index