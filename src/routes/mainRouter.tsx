import { createBrowserRouter } from 'react-router-dom'
import { getCookie, setToken } from '../utils/auth'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            const token = getCookie('token')

            if (token) {
                setToken(token)
            }

            return null
        },
        children: [
            ...elephantRoutes
        ]
    }
])

export default router