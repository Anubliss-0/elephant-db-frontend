import { getElephantById, createElephant, deleteElephant, updateElephant, getAllElephants, retreiveAllElephants } from '../utils/api'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18n from '../i18n'
import ErrorPage from '../ErrorPage'
import Index from '../pages/Elephant/Index/Index'
import Edit from '../pages/Elephant/Edit/Edit'
import Show from '../pages/Elephant/Show/Show'
import NewIndex from '../pages/Elephant/Index/NewIndex'

const elephantRoutes = [
  // Elephant Index
  // {
  //   path: "elephants",
  //   element: <Index />,
  //   action: async ({ request }: ActionFunctionArgs) => {
  //     const formData = await request.formData()
  //     const page = formData.get("page")
  //     const habitat = formData.get("habitat")
  //     const gender = formData.get("gender")
  //     const species = formData.get("species")
  //     const response = await getAllElephants(page as string, habitat as string, gender as string, species as string)
  //     return response.data
  //   },
  //   errorElement: <ErrorPage />
  // },

  {
    path: "elephants",
    element: <NewIndex />,
    loader: async ({ request }: LoaderFunctionArgs) => {
      const url = new URL(request.url)
      const page = url.searchParams.get("page")
      const response = await retreiveAllElephants(Number(page))
      return {
        elephants: response.data.elephants.data,
        currentPage: response.data.current_page,
        hasMore: response.data.has_more,
        totalElephants: response.data.total_elephants
      }
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
    errorElement: <ErrorPage />
  },

  // Elephant Edit
  {
    path: "elephants/:id/edit",
    element: <Edit editMode={true} />,
    action: async ({ request, params }: ActionFunctionArgs) => {
      const id = params.id as string

      if (request.method === "PATCH") {
        try {
          const formData = await request.formData();
          await updateElephant(id, formData);
          toast.success(i18n.t("elephants.updated"));
          return redirect(`/elephants/${id}`);
        } catch (error: any) {
          const errorMessage = error.response.data.error || error.response.data;
          return toast.error(i18n.t(errorMessage))
        }
      } else if (request.method === "DELETE") {
        try {
          await deleteElephant(id);
          toast.success(i18n.t("elephants.deleted"));
          return redirect("/elephants");
        } catch (error: any) {
          const errorMessage = error.response.data.error || error.response.data;
          return toast.error(i18n.t(errorMessage))
        }
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
