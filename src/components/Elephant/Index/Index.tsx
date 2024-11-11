import { useLoaderData } from "react-router-dom"
import ElephantCard from "../ElephantCard/ElephantCard"
import { useUser } from "../../../contexts/UserContext"
import { useEffect } from "react"
import { getCookie, setToken } from "../../../utils/auth"

function Index() {
    const elephants = useLoaderData() as Array<{ id: string; attributes: { name: string, photo: string } }>
    const { setUserName } = useUser()

    useEffect(() => {
        const token = getCookie('token')
        const userName = getCookie('user_name')

        if (token) {
            setToken(token)
        }

        setUserName(userName)
    }, [setUserName])
    
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