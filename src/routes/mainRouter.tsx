import { createBrowserRouter } from 'react-router-dom'
import { getCookie, setToken } from '../utils/auth'
import App from '../App'
import ErrorPage from '../ErrorPage'
import elephantRoutes from './elephantRoutes'
import authRoutes from './authRoutes'

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
        errorElement: <ErrorPage />,
        children: [
            ...elephantRoutes,
            ...authRoutes
        ]
    }
])

export default router