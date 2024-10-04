import { useState, useEffect } from "react"
import axios from "axios"

function Index() {
    const [elephants, setElephants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/elephants') // Assuming Rails runs on port 3000
            .then(response => {
                console.log(response.data)
                setElephants(response.data);
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
                    <li key={elephant.id}>{elephant.name}</li>
                ))}
            </ul>
        </>
    )
}

export default Index