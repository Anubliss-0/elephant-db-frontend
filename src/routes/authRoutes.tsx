import ErrorPage from '../ErrorPage';
import Signup from '../components/Auth/Signup/Signup';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { handleSignup, handleLogin, handleLogout } from '../utils/auth';
  
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
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      await handleLogin(formData)
      return null
    },
    errorElement: <ErrorPage />
  },
  {
    path: "logout",
    action: async () => {
      await handleLogout()
      return null
    }
  }
];

export default authRoutes