import { ActionFunctionArgs, createBrowserRouter, LoaderFunctionArgs, redirect } from 'react-router-dom'
import { getTokenFromCookies, setTokenCookies } from '../utils/auth'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'
import Show from '../components/Profile/Show/Show'
import { getProfileById, updateProfile } from '../utils/api'
import Signup from '../components/Auth/Signup/Signup'

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
            {
                path: "profiles/:id",
                element: <Show />,
                loader: async ({ params }: LoaderFunctionArgs) => {
                    const response = await getProfileById(params.id as string)
                    console.log(response)
                    return { profile: response.data }
                }
            },
            {
                path: "signup",
                element: <Signup />
            }
        ]
    }
])

export default router