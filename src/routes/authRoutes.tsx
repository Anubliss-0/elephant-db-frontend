import { redirect, ActionFunctionArgs } from 'react-router-dom'
import { loginUser } from '../utils/api'
import Login from '../components/Auth/Login/Login'
import { setToken } from '../utils/auth';
import ErrorPage from '../ErrorPage';

const authRoutes = [
  {
    path: "login",
    element: <Login />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const userData = new FormData();
      formData.forEach((value, key) => {
        userData.append(`user[${key}]`, value);
      });

      const response = await loginUser(userData);
      const jwtToken = response.headers.authorization.split(' ')[1];
      setToken(jwtToken, true);
      return redirect('/elephants');
    },
    errorElement: <ErrorPage />
  }
];

export default authRoutes