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
    elephantTotal: number
    isHovering: boolean
}

function IndexFilter({
    habitat,
    gender,
    species,
    setHabitat,
    setGender,
    setSpecies,
    setPage,
    setIsFiltering,
    isFilterVisible,
    elephantTotal,
    isHovering
}: IndexFilterProps) {
    const { theme } = useTheme()

    const getContainerClassNames = () => {
        return classNames(styles.container, {
            [styles.filterVisible]: isFilterVisible,
            [styles[theme]]: theme,
            [styles.hovering]: !isFilterVisible && isHovering
        })
    }

    return (
        <div className={getContainerClassNames()}>
            <div className={styles.innerFilter}>
            <h3>Filter Results</h3>
                <div className={styles.filterRow}>
                    <label>Habitat
                        <select value={habitat} onChange={(e) => {
                            setHabitat(e.target.value)
                            setPage(1)
                            setIsFiltering(true)
                        }}>
                            <option value="">All</option>
                            {ElephantOptions.habitatOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={styles.filterRow}>
                    <label>Gender
                        <select value={gender} onChange={(e) => {
                            setGender(e.target.value)
                            setPage(1)
                            setIsFiltering(true)
                        }}>
                            <option value="">All</option>
                            {ElephantOptions.genderOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={styles.filterRow}>
                    <label>Species
                        <select value={species} onChange={(e) => {
                            setSpecies(e.target.value)
                            setPage(1)
                            setIsFiltering(true)
                        }}>
                            <option value="">All</option>
                            {ElephantOptions.speciesOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={styles.totalElephants}>
                    <p>Total Elephants: {elephantTotal}</p>
                </div>
            </div>
        </div>
    )
}

export default IndexFilter