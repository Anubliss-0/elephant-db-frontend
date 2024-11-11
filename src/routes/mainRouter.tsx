import { ActionFunctionArgs, createBrowserRouter, LoaderFunctionArgs, redirect } from 'react-router-dom'
import { getCookie, setToken } from '../utils/auth'
import elephantRoutes from './elephantRoutes'
import App from '../App'
import ErrorPage from '../ErrorPage'
import Show from '../components/Profile/Show/Show'
import { getProfileById, updateProfile } from '../utils/api'

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
            ...elephantRoutes,
            {
                path: "profiles/:id",
                element: <Show />,
                loader: async ({ params }: LoaderFunctionArgs) => {
                    const response = await getProfileById(params.id as string)
                    console.log(response)
                    return { profile: response.data }
                }
            }
        ]
    }
])

export default router