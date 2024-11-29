import classNames from "classnames"
import * as ElephantOptions from "../../../../constants/elephantOptions"
import styles from "./IndexFilter.module.scss"
import { useTheme } from "../../../../contexts/ThemeContext"

interface IndexFilterProps {
    habitat: string
    gender: string
    species: string
    setHabitat: (habitat: string) => void
    setGender: (gender: string) => void
    setSpecies: (species: string) => void
    setPage: (page: number) => void
    setIsFiltering: (isFiltering: boolean) => void
    isFilterVisible: boolean
}

function IndexFilter({ habitat, gender, species, setHabitat, setGender, setSpecies, setPage, setIsFiltering, isFilterVisible }: IndexFilterProps) {
    return (
        <div className={classNames(styles.filter, { [styles.filterVisible]: isFilterVisible })}>
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

            <select value={gender} onChange={(e) => {
                setGender(e.target.value)
                setPage(1)
                setIsFiltering(true)
            }}>
                <option value="">Gender</option>
                {ElephantOptions.genderOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <select value={species} onChange={(e) => {
                setSpecies(e.target.value)
                setPage(1)
                setIsFiltering(true)
            }}>
                <option value="">Species</option>
                {ElephantOptions.speciesOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default IndexFilter