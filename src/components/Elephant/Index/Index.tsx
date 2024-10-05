import { Link, useLoaderData } from "react-router-dom"

function Index() {
    const elephants = useLoaderData() as Array<{ id: string; attributes: { name: string } }>

    return (
        <div>
            <h1>Elephants</h1>
            <ul>
                {elephants.map((elephant) => (
                    <li key={elephant.id}>
                        <Link to={`/elephants/${elephant.id}`}>{elephant.attributes.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Index