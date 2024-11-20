import { FetcherWithComponents } from 'react-router-dom'

interface LoginProps {
    fetcher: FetcherWithComponents<any>;
}

function Login({ fetcher }: LoginProps) {
    return (
        <fetcher.Form method="post" action="/login">
            <input
                type="email"
                name="email"
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </fetcher.Form>
    )
}

export default Login