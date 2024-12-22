import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import Signup from "../components/Auth/Signup/Signup"
import Show from "../pages/Profile/Show/Show"
import { getProfileById, updateProfile } from "../utils/api"
import Edit from "../pages/Profile/Edit/Edit"
import i18n from "../i18n"
import { toast } from "react-toastify"
import ErrorPage from "../ErrorPage"

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

    // Profile Edit
    {
        path: "profiles/:id/edit",
        element: <Edit />,
        action: async ({ request, params }: ActionFunctionArgs) => {
            const id = params.id as string
            const formData = await request.formData()
            try {
                await updateProfile(id, formData)
                toast.success(i18n.t("profiles.updated"))
                return redirect(`/profiles/${id}`)
            } catch (error: any) {
                const errorMessage = error.response.data.error || error.response.data;
                return toast.error(i18n.t(errorMessage))
            }
        },
        errorElement: <ErrorPage />
    },

    // Signup
    {
        path: "signup",
        element: <Signup />
    }
]

export default profileRoutes