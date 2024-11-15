import ErrorPage from '../ErrorPage';
import Signup from '../components/Auth/Signup/Signup';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { handleSignup } from '../utils/auth';
  
const authRoutes = [
  {
    path: "signup",
    element: <Signup />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      await handleSignup(formData)
      return redirect('/elephants')
    },
    errorElement: <ErrorPage />
  }
];

export default authRoutes