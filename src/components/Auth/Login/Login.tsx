import { Form } from "react-router-dom"

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Form method="post">
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Login</button>
            </Form>
        </div>
    );
}

export default Login