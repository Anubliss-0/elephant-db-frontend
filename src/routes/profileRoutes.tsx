import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { shouldRevalidateOnNonAuthAction } from "../utils/revalidationUtils"
import Signup from "../components/Auth/Signup/Signup"
import Show from "../components/Profile/Show/Show"
import { getProfileById, updateProfile } from "../utils/api"
import { storeProfileData } from "../utils/localStorageManager"

const profileRoutes = [
    // Profile Show
    {
        path: "profiles/:id",
        element: <Show />,
        loader: async ({ params }: LoaderFunctionArgs) => {
            const response = await getProfileById(params.id as string)
            return { profile: response.data }
        },
        action: async ({ request, params }: ActionFunctionArgs) => {
            const id = params.id as string
            const formData = await request.formData()
            const response = await updateProfile(id, formData)
            storeProfileData(response)
            return redirect(`/profiles/${id}`)
        },
        shouldRevalidate: shouldRevalidateOnNonAuthAction
    },
    // Signup
    {
        path: "signup",
        element: <Signup />
    }
]

export default profileRoutes