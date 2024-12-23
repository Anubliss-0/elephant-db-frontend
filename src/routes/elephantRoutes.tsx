import { getElephantById, createElephant, deleteElephant, updateElephant, getAllElephants } from '../utils/api'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18n from '../i18n'
import New from '../pages/Elephant/ElephantManagement/New'
import ErrorPage from '../ErrorPage'
import Index from '../pages/Elephant/Index/Index'
import Edit from '../pages/Elephant/ElephantManagement/Edit'
import Show from '../pages/Elephant/Show/Show'

const elephantRoutes = [
  // Elephant Index
  {
    path: "elephants",
    element: <Index />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData()
      const page = formData.get("page")
      const habitat = formData.get("habitat")
      const gender = formData.get("gender")
      const species = formData.get("species")
      const response = await getAllElephants(page as string, habitat as string, gender as string, species as string)
      return response.data
    },
    errorElement: <ErrorPage />
  },

  // Elephant Show
  {
    path: "elephants/:id",
    element: <Show />,
    loader: async ({ params }: LoaderFunctionArgs) => {
      const response = await getElephantById(params.id as string)
      return { elephant: response.data.data.attributes }
    },
    action: async ({ params }: ActionFunctionArgs) => {
      const id = params.id as string

      try {
        await deleteElephant(id);
        toast.success(i18n.t("elephants.deleted"));
        return redirect("/elephants");
      } catch (error: any) {
        const errorMessage = error.response.data.error || error.response.data;
        return toast.error(i18n.t(errorMessage))
      }
    },
    errorElement: <ErrorPage />
  },

  // Elephant Edit
  {
    path: "elephants/:id/edit",
    element: <Edit editMode={true} />,
    action: async ({ request, params }: ActionFunctionArgs) => {
      const id = params.id as string

      try {
        const formData = await request.formData();
        await updateElephant(id, formData);
        toast.success(i18n.t("elephants.updated"));
        return redirect(`/elephants/${id}`);
      } catch (error: any) {
        const errorMessage = error.response.data.error || error.response.data;
        return toast.error(i18n.t(errorMessage))
      }
    },
    errorElement: <ErrorPage />
  },

  // Elephant New
  {
    path: "new_elephant",
    element: <Edit editMode={false} />,
    action: async ({ request }: ActionFunctionArgs) => {
      try {
        const formData = await request.formData()
        const response = await createElephant(formData)
        toast.success(i18n.t("elephants.created"))
        return redirect(`/elephants/${response.data.id}`)
      } catch (error: any) {
        const errorMessage = error.response.data.errors || error.response.data;
        return toast.error(i18n.t(errorMessage))
      }
    },
    errorElement: <ErrorPage />
  }
]

export default elephantRoutes
