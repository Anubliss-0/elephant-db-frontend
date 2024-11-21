import { getElephantsByQuery, getElephantById, createElephant, deleteElephant, updateElephant } from '../utils/api'
import { shouldRevalidateOnNonAuthAction } from '../utils/revalidationUtils'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import Index from '../components/Elephant/Index/Index'
import Show from '../components/Elephant/Show/Show'
import New from '../components/Elephant/New/New'
import ErrorPage from '../ErrorPage'

const elephantRoutes = [
  // Elephant Index
  {
    path: "elephants",
    element: <Index />,
    loader: async ({ request }: LoaderFunctionArgs) => {
      const url = new URL(request.url)
      const query = url.searchParams.toString()
      const response = await getElephantsByQuery(query)
      return response.data.data
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
