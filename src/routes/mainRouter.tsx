import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import ErrorPage from '../ErrorPage'
import elephantRoutes from './elephantRoutes'
import authRoutes from './authRoutes'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            ...elephantRoutes,
            ...authRoutes
        ]
    }
])

export default router;