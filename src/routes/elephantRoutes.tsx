import { getAllElephants, getElephantById, createElephant, deleteElephant } from '../utils/api';
import Index from '../components/Elephant/Index/Index'
import Show from '../components/Elephant/Show/Show'
import New from '../components/Elephant/New/New'
import { redirect, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';

const elephantRoutes = [
  {
    path: "elephants",
    element: <Index />,
    loader: async () => {
      try {
        const response = await getAllElephants();
        return response.data.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  },
  {
    path: "elephants/:id",
    element: <Show />,
    loader: async ({ params }: LoaderFunctionArgs) => {
      try {
        const response = await getElephantById(params.id as string);
        return { elephant: response.data };
      } catch (error) {
        console.log(error);
        throw redirect("/elephants");
      }
    },
    action: async ({ params }: LoaderFunctionArgs) => {
      try {
        await deleteElephant(params.id as string);
        return redirect("/elephants");
      } catch (error) {
        console.error("Error deleting elephant:", error);
        return null;
      }
    }
  },
  {
    path: "new_elephant",
    element: <New />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData();
      const name = formData.get("name");
      const bio = formData.get("bio");

      if (typeof name !== "string" || typeof bio !== "string") {
        throw new Error("Invalid form data");
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
];

export default elephantRoutes;