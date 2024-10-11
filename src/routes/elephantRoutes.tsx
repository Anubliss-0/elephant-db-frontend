import { getAllElephants, getElephantById, createElephant, deleteElephant, editElephantById } from '../utils/api'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import Index from '../components/Elephant/Index/Index'
import Show from '../components/Elephant/Show/Show'
import New from '../components/Elephant/New/New'

const elephantRoutes = [

  // Elephant Index
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

  // Elephant Show
  {
    path: "elephants/:id",
    element: <Show />,
    loader: async ({ params }: LoaderFunctionArgs) => {
      try {
        const response = await getElephantById(params.id as string)
        return { elephant: response.data }
      } catch (error) {
        console.log(error)
        throw redirect("/elephants")
      }
    },
    action: async ({ request, params }: ActionFunctionArgs) => {
      const id = params.id as string;
  
      if (request.method === "DELETE") {
        // Delete Elephant
        try {
          await deleteElephant(id)
          return redirect("/elephants")
        } catch (error) {
          console.error("Error deleting elephant:", error)
          return null
        }
      } else if (request.method === "PATCH" || request.method === "PUT") {
        // Update Elephant
        const formData = await request.formData()
        const name = formData.get("name")
        const bio = formData.get("bio")
  
        if (typeof name !== "string" || typeof bio !== "string") {
          throw new Error("Invalid form data")
        }
  
        try {
          await editElephantById(id, { name, bio })
          return redirect(`/elephants/${id}`)
        } catch (error) {
          console.error("Error editing elephant:", error)
        }
      }
    }
  },

  // Create Elephant
  {
    path: "new_elephant",
    element: <New />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const name = formData.get("name")
      const bio = formData.get("bio")
      const photos = formData.getAll("photos") as File[]

      if (typeof name !== "string" || typeof bio !== "string") {
        throw new Error("Invalid form data")
      }

      try {
        const response = await createElephant({ name, bio, photos })
        const newElephantId = response.data.data.id
        return redirect(`/elephants/${newElephantId}`)
      } catch (error) {
        console.error("Error creating elephant:", error)
        return null
      }
    }
  }
]

export default elephantRoutes