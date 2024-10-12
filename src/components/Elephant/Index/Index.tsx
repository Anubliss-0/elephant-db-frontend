import { useLoaderData } from "react-router-dom"
import ElephantCard from "../ElephantCard/ElephantCard";

function Index() {
    const elephants = useLoaderData() as Array<{ id: string; attributes: { name: string, photo: string } }>

    return (
        <div>
            <h1>Elephants</h1>
                {elephants.map((elephant) => (
                    <ElephantCard key={elephant.id} elephant={elephant} />
                ))}
        </div>
    )
}

export default Index