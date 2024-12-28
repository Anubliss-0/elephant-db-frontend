import { ActionFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom'
import { removeTokenCookies, setTokenFromCookies } from '../utils/cookieManager'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'
import profileRoutes from './profileRoutes'
import authRoutes from './authRoutes'
import { getCurrentUser, logOutUser } from '../utils/api'
import { toast } from 'react-toastify'
import i18n from '../i18n'

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
        action: async () => {
            try {
                await logOutUser()
                removeTokenCookies()
                toast.success(i18n.t("sessions.signedOut"))
                return redirect("/elephants")
            } catch (error) {
                return toast.error(i18n.t("sessions.signedOut"))
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