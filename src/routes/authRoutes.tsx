import ErrorPage from '../ErrorPage';
import Signup from '../components/Auth/Signup/Signup';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { handleSignup, handleLogin } from '../utils/auth';
  
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
  },
  {
    path: "login",
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData();
      const response = await handleLogin(formData);
      return response;
    },
    errorElement: <ErrorPage />
  }
];

export default authRoutes