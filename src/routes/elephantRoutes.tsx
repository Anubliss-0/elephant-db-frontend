import { getElephantsByQuery, getElephantById, createElephant, deleteElephant, updateElephant, getAllElephants } from '../utils/api'
import { shouldRevalidateOnNonAuthAction } from '../utils/revalidationUtils'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import Show from '../components/Elephant/Show/Show'
import New from '../components/Elephant/New/New'
import ErrorPage from '../ErrorPage'
import NewIndex from '../components/Elephant/Index/NewIndex'

const elephantRoutes = [
  // Elephant Index
  {
    path: "elephants",
    element: <NewIndex />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const page = formData.get("page") 
      const habitat = formData.get("habitat")
      const gender = formData.get("gender")
      const species = formData.get("species")
      const response = await getAllElephants(page as string, habitat as string, gender as string, species as string)
      return response.data
    },
    shouldRevalidate: shouldRevalidateOnNonAuthAction,
    errorElement: <ErrorPage />
  },

  // Elephant Show
  {
    path: "elephants/:id",
    element: <Show />,
    loader: async ({ params }: LoaderFunctionArgs) => {
      const response = await getElephantById(params.id as string)
      return { elephant: response.data }
    },
    shouldRevalidate: shouldRevalidateOnNonAuthAction,
    action: async ({ request, params }: ActionFunctionArgs) => {
      const id = params.id as string

      if (request.method === "DELETE") {
        await deleteElephant(id)
        return redirect("/elephants")
      }

      if (request.method === "PATCH" || request.method === "PUT") {
        const formData = await request.formData();
        await updateElephant(id, formData);
        return redirect(`/elephants/${id}`)
      }
    },
    errorElement: <ErrorPage />
  },

  // Create Elephant
  {
    path: "new_elephant",
    element: <New />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const response = await createElephant(formData)
      const newElephantId = response.data.data.id
      return redirect(`/elephants/${newElephantId}`)
    },
    errorElement: <ErrorPage />
  }
]

export default elephantRoutes
