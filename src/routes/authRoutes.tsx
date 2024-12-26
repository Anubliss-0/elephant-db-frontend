import Signup from '../components/Auth/Signup/Signup'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { handleSignup, handleLogin, handleLogout } from '../utils/auth'
import i18n from '../i18n'
import { toast } from 'react-toastify'
import Login from '../pages/Auth/Login/Login'
  
const authRoutes = [
  {
    path: "signup",
    element: <Signup />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const response = await handleSignup(formData)
      const id = response.profile.id
      return redirect(`/profiles/${id}`)
    },
  },
  {
    path: "login",
    element: <Login />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()

      try {
        await handleLogin(formData)
        toast.success(i18n.t("sessions.signedIn"))
        return redirect(`/elephants`)
      } catch (error: any) {
        return toast.error(i18n.t(error.response.data))
      }
    },
  },
  {
    path: "logout",
    action: async () => {
      try {
        await handleLogout()
        return toast.success(i18n.t("sessions.signedOut"))
      } catch (error: any) {
        return toast.error(i18n.t(error.response.data))
      }
    },
  }
];

export default authRoutes