import { getElephantsByQuery, getElephantById, createElephant, deleteElephant, updateElephant, getAllElephants } from '../utils/api'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18n from '../i18n'
import New from '../components/Elephant/Editnew/New/New'
import ErrorPage from '../ErrorPage'
import NewIndex from '../components/Elephant/Index/NewIndex'
import Edit from '../components/Elephant/EditNew/Edit/Edit'
import NewShow from '../components/Elephant/Show/NewShow'

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
    errorElement: <ErrorPage />
  },

  // Elephant Show
  {
    path: "elephants/:id",
    element: <NewShow />,
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
    element: <Edit />,
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

  {
    path: "new_elephant",
    element: <New />,
    action: async ({ request }: ActionFunctionArgs) => {
      try {
        const formData = await request.formData()
        const response = await createElephant(formData)
        toast.success(i18n.t("elephants.created"))
        return redirect(`/elephants/${response.data.data.id}`)
      } catch (error: any) {
        const errorMessage = error.response.data.error || error.response.data;
        return toast.error(i18n.t(errorMessage))
      }
    },
    errorElement: <ErrorPage />
  }
]

export default elephantRoutes
