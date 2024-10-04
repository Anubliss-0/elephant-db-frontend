import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom"
import App from './App.tsx'
import './index.css'
import ErrorPage from './ErrorPage.tsx'
import Index from './routes/Index.tsx'
import Show from './routes/Show.tsx'
import Login from './routes/Login.tsx'
import New from './routes/New.tsx'


const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Navigate to="elephants" />
    },
    {
      path: "elephants",
      element: <Index />
    },
    {
      path: "elephants/:id",
      element: <Show />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "new_elephant",
      element: <New />
    }
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
