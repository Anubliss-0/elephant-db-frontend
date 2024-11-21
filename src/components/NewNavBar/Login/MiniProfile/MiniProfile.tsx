import { useUser } from "../../../../contexts/UserContext"
import { FetcherWithComponents } from "react-router-dom"

interface MiniProfileProps {
    fetcher: FetcherWithComponents<any>;
}

function MiniProfile({ fetcher }: MiniProfileProps) {
    const { user } = useUser()

    return (
        <>
            {user.userName}
            {user.profileImageUrl && <img src={user.profileImageUrl} alt={`${user.userName}'s profile`} />}
            <fetcher.Form method="post" action="/logout">
                <button type="submit">Logout</button>
            </fetcher.Form>
        </>
    )
}

export default MiniProfile