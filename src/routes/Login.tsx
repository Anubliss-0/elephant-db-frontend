import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission refresh

        try {
            delete axios.defaults.headers.common['Authorization'];
            const response = await axios.post('http://localhost:3000/login', {
                user: {
                    email,
                    password
                }
            });

            console.log(response); // Debugging the response
            const jwtToken = response.headers.authorization.split(' ')[1]; // Extract JWT token from headers

            // Set the token in Axios defaults so it's automatically included in all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

            // Optionally store the token in cookies for persistence across sessions
            document.cookie = `token=${jwtToken}; path=/; Secure; SameSite=Strict`;

            // Redirect to a protected route, for example, to the elephants page
            navigate(`/elephants`)
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

export default Login;