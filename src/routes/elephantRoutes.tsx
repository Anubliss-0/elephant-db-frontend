import { getAllElephants, getElephantById, createElephant, deleteElephant, editElephantById } from '../utils/api'
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
    loader: async () => {
      const response = await getAllElephants()
      return response.data.data
    },
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
    action: async ({ request, params }: ActionFunctionArgs) => {
      const id = params.id as string

      if (request.method === "DELETE") {
        await deleteElephant(id)
        return redirect("/elephants")
      }

      if (request.method === "PATCH" || request.method === "PUT") {
        const formData = await request.formData();
        const name = formData.get("elephant[name]") as string | null;
        const bio = formData.get("elephant[bio]") as string | null;

        // Collect photo positions
        console.log(formData)
        const photos: { id: string; position: number }[] = []
        formData.forEach((value, key) => {
          if (key.startsWith("elephant[photos][")) {
            const match = key.match(/elephant\[photos\]\[(\d+)\]\[(id|position)\]/);
            if (match) {
              const index = parseInt(match[1], 10);
              const field = match[2];
              if (!photos[index]) photos[index] = { id: "", position: 0 };
              photos[index][field] = field === "position" ? parseInt(value as string, 10) : (value as string);
            }
          }
        })

        if (!name || !bio) {
          throw new Error("Invalid form data: name and bio must be provided")
        }

        const elephantData = {
          name,
          bio,
          photos, // Send photo IDs and positions
        }

        await editElephantById(id, elephantData)
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
      const name = formData.get("name") as string | null
      const bio = formData.get("bio") as string | null
      const photos = formData.getAll("photos") as File[]

      if (!name || !bio) {
        throw new Error("Invalid form data: name and bio must be provided")
      }

      const response = await createElephant({ name, bio, photos })
      const newElephantId = response.data.data.id
      return redirect(`/elephants/${newElephantId}`)
    },
    errorElement: <ErrorPage />
  }
]

export default elephantRoutes
