import * as ElephantOptions from "../../../../constants/elephantOptions"

interface IndexFilterProps {
    habitat: string
    setHabitat: (habitat: string) => void
    setPage: (page: number) => void
    setIsFiltering: (isFiltering: boolean) => void
}

function IndexFilter({ habitat, setHabitat, setPage, setIsFiltering }: IndexFilterProps) {
    return (
        <div>
            <select value={habitat} onChange={(e) => {
                setHabitat(e.target.value)
                setPage(1)
                setIsFiltering(true)
            }}>
                <option value="">Habitat</option>
                {ElephantOptions.habitatOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default IndexFilter