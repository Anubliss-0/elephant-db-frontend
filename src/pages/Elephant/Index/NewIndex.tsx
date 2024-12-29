import { useFetcher, useLoaderData } from 'react-router-dom'
import { ElephantIndexData } from '../../../types'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './NewIndex.module.scss'
import { useState, useEffect } from 'react'

function NewIndex() {
    const options = useLoaderData() as { habitatOptions: string[], genderOptions: string[], speciesOptions: string[] }
    const [elephants, setElephants] = useState<ElephantIndexData[]>([])
    const [hasMore, setHasMore] = useState(false)
    const [totalElephants, setTotalElephants] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const fetcher = useFetcher()

    const [habitat, setHabitat] = useState("")
    const [gender, setGender] = useState("")
    const [species, setSpecies] = useState("")
    const habitatOptions = options.habitatOptions
    const genderOptions = options.genderOptions
    const speciesOptions = options.speciesOptions

    useEffect(() => {
        fetcher.load(`/elephants?page=1&habitat=${habitat}&gender=${gender}&species=${species}`)
    }, [])

    useEffect(() => {
        if (fetcher.data) {
            setElephants(prevElephants => [...prevElephants, ...fetcher.data.elephants])
            setHasMore(fetcher.data.hasMore)
            setTotalElephants(fetcher.data.totalElephants)
            setCurrentPage(fetcher.data.currentPage)
        }
    }, [fetcher.data])

    const handleLoadMore = () => {
        fetcher.load(`/elephants?page=${currentPage + 1}&habitat=${habitat}&gender=${gender}&species=${species}`)
    }

    const handleHabitatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHabitat(e.target.value)
        setElephants([])
        fetcher.load(`/elephants?page=1&habitat=${e.target.value}&gender=${gender}&species=${species}`)
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
        setElephants([])
        fetcher.load(`/elephants?page=1&habitat=${habitat}&gender=${e.target.value}&species=${species}`)
    }

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSpecies(e.target.value)
        setElephants([])
        fetcher.load(`/elephants?page=1&habitat=${habitat}&gender=${gender}&species=${e.target.value}`)
    }

    return (
        <div>

            <div>
                <select value={habitat} onChange={handleHabitatChange}>
                    <option value="">All</option>
                    {habitatOptions.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">All</option>
                    {genderOptions.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select value={species} onChange={handleSpeciesChange}>
                    <option value="">All</option>
                    {speciesOptions.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className={styles.debug}>
                <p>totalElephants: {totalElephants}</p>
                <p>currentPage: {currentPage}</p>
                <p>hasMore: {hasMore ? "true" : "false"}</p>
                <p>habitatOptions: {JSON.stringify(habitatOptions)}</p>
                <p>genderOptions: {JSON.stringify(genderOptions)}</p>
                <p>speciesOptions: {JSON.stringify(speciesOptions)}</p>
            </div>
            
            <h1>New Index</h1>
            <InfiniteScroll
                dataLength={elephants.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                className={styles.elephantList}
            >
                {elephants.map((elephant: ElephantIndexData) => (
                    <div key={elephant.id}>
                        <h2>{elephant.attributes.name}</h2>
                        <img src={elephant.attributes.photo} alt={elephant.attributes.name} className={styles.elephantImage} />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default NewIndex

// Add a loading wheel or something to show that the page is loading
// Or maybe dont render until it has data?