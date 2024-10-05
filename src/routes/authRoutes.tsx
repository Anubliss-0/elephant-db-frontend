import { redirect, ActionFunctionArgs } from 'react-router-dom'
import { loginUser } from '../utils/api'
import Login from '../components/Auth/Login/Login'

const authRoutes = [
    {
        path: "login",
        element: <Login />,
        action: async ({ request }: ActionFunctionArgs) => {
          const formData = await request.formData();
          const email = formData.get("email");
          const password = formData.get("password");
    
          if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid form data");
          }
    
          try {
            await loginUser(email, password);
            return redirect('/elephants');
          } catch (error) {
            console.error('Error logging in:', error);
            return null;
          }
        }
      }
];

export default authRoutes