import { Form } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Button from '../Button/Button'

function NavBar() {
    const { user } = useUser()

    return (
        <div>
            {user?.name}
            {user?.name ? <div>Logged In</div> : <div>Logged Out</div>}
            <Button type="button" to="/login">Login</Button>
            <Form method="post">
                <Button type="submit">Logout</Button>
            </Form>
        </div>
    )
}

export default NavBar