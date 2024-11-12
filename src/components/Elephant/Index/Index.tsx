import { useLoaderData, useSearchParams } from "react-router-dom"
import ElephantCard from "../ElephantCard/ElephantCard"
import { useState } from "react"
import * as ElephantOptions from "../../../constants/elephantOptions"

function Index() {
    const elephants = useLoaderData() as Array<{ id: string; attributes: { name: string, photo: string } }>
    const [searchParams, setSearchParams] = useSearchParams()
    const [age, setAge] = useState(searchParams.get("age") || "")
    const [species, setSpecies] = useState(searchParams.get("species") || "")
    const [gender, setGender] = useState(searchParams.get("gender") || "")
    const [habitat, setHabitat] = useState(searchParams.get("habitat") || "")

    const handleFilterChange = () => {
        const params: Record<string, string> = {}
        if (age) params.age = age
        if (species) params.species = species
        if (gender) params.gender = gender
        if (habitat) params.habitat = habitat
        setSearchParams(params)
    }

    return (
        <div>
            <h1>Elephants</h1>
            <div>
                <label>
                    Age:
                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <label>
                    Species:
                    <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                    >
                        <option value="">All</option>
                        {ElephantOptions.speciesOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Gender:
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">All</option>
                        {ElephantOptions.genderOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Habitat:
                    <select
                        value={habitat}
                        onChange={(e) => setHabitat(e.target.value)}
                    >
                        <option value="">All</option>
                        {ElephantOptions.habitatOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleFilterChange}>Filter</button>
            </div>
            {elephants.length > 0 ? (
                elephants.map((elephant) => (
                    <ElephantCard key={elephant.id} elephant={elephant} />
                ))
            ) : (
                <p>No elephants found</p>
            )}
        </div>
    )
}

export default Index