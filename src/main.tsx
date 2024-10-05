import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect
} from "react-router-dom"
import { getElephantById, deleteElephant, createElephant, getAllElephants } from './utils/api.ts'
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
      element: <Index />,
      loader: async () => {
        try {
          const response = await getAllElephants()
          return response.data.data
        } catch (error) {
          console.log(error)
          return null
        }
      }
    },
    {
      path: "elephants/:id",
      element: <Show />,
      loader: async ({ params }) => {
        try {
          const response = await getElephantById(params.id as string)
          return { elephant: response.data }
        } catch (error) {
          console.log(error)
          throw redirect("/elephants");
        }
      },
      action: async ({ params }) => {
        try {
          await deleteElephant(params.id as string)
          return redirect("/elephants")
        } catch (error) {
          console.error("Error deleting elephant:", error)
          return null;
        }
      }
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "new_elephant",
      element: <New />,
      action: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get("name");
        const bio = formData.get("bio");

        if (typeof name !== "string" || typeof bio !== "string") {
          throw new Error("Invalid form data")
        }

        try {
          const response = await createElephant({ name, bio });
          const newElephantId = response.data.data.id;

          return redirect(`/elephants/${newElephantId}`);
        } catch (error) {
          console.error("Error creating elephant:", error);
          return null;
        }
      }
    }
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
