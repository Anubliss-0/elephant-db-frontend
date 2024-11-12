import { LoaderFunctionArgs } from "react-router-dom"
import Signup from "../components/Auth/Signup/Signup"
import Show from "../components/Profile/Show/Show"
import { getProfileById } from "../utils/api"

const profileRoutes = [
    // Profile Show
    {
        path: "profiles/:id",
        element: <Show />,
        loader: async ({ params }: LoaderFunctionArgs) => {
            const response = await getProfileById(params.id as string)
            return { profile: response.data }
        }
    },
    // Signup
    {
        path: "signup",
        element: <Signup />
    }
]

export default profileRoutes