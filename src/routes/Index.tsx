import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getAllElephants } from "../utils/api";

function Index() {
    const [elephants, setElephants] = useState([]);

    useEffect(() => {
        getAllElephants()
            .then(response => {
                setElephants(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the elephants!', error);
            });
    }, []);

    return (
        <>
            <h1>List of Elephants</h1>
            <ul>
                {elephants.map(elephant => (
                    <li key={elephant.id}>
                        <Link to={`/elephants/${elephant.id}`}>{elephant.attributes.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Index