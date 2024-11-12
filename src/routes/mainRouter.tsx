import { createBrowserRouter } from 'react-router-dom'
import { getTokenFromCookies, setTokenCookies } from '../utils/cookieManager'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'
import profileRoutes from './profileRoutes'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            const token = getTokenFromCookies()

            if (token) {
                setTokenCookies(token)
            }

            return null
        },
        children: [
            ...elephantRoutes,
            ...profileRoutes
        ],
        errorElement: <ErrorPage />
    }
])

export default router