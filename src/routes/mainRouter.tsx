import { createBrowserRouter } from 'react-router-dom'
import { setTokenFromCookies } from '../utils/cookieManager'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'
import profileRoutes from './profileRoutes'
import authRoutes from './authRoutes'
import { getCurrentUser } from '../utils/api'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            const tokenSet = setTokenFromCookies()
            if (tokenSet) {
                const response = await getCurrentUser()
                return { user: response.data }
            } else {
                return { user: null }
            }
        },
        children: [
            ...authRoutes,
            ...elephantRoutes,
            ...profileRoutes
        ],
        errorElement: <ErrorPage />
    }
])

export default router