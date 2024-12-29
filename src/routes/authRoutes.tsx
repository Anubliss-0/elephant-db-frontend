import SignUp from '../pages/Auth/SignUp/SignUp'
import { ActionFunctionArgs, redirect } from 'react-router-dom'
import i18n from '../i18n'
import { toast } from 'react-toastify'
import Login from '../pages/Auth/Login/Login'
import { loginUser, signUpUser } from '../utils/api'
import { setTokenCookies } from '../utils/cookieManager'

const authRoutes = [
  {
    path: "signup",
    element: <SignUp />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      try {
        const response = await signUpUser(formData)
        const token = response.headers.authorization.split(' ')[1]
        setTokenCookies(token)
        toast.success(i18n.t("sessions.signedIn"))
        console.log(response.data)
        return redirect(`/elephants`)
      } catch (error: any) {
        return toast.error(i18n.t(error.response.data))
      }
    }
  },
  {
    path: "login",
    element: <Login />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      try {
        const response = await loginUser(formData)
        const token = response.headers.authorization.split(' ')[1]
        setTokenCookies(token)
        toast.success(i18n.t("sessions.signedIn"))
        return redirect(`/elephants`)
      } catch (error: any) {
        return toast.error(i18n.t(error.response.data))
      }
    },
  },
]

export default authRoutes