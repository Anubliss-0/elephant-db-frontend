import { useEffect, useState, useRef } from "react"
import { useFetcher } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import InfiniteScroll from "react-infinite-scroll-component"
import classNames from "classnames"
import ElephantCard from "./ElephantCard/ElephantCard"
import { ElephantIndexData } from "../../../types"
import styles from "./Index.module.scss"
import IndexFilter from "./IndexFilter/IndexFilter"
import { TfiFilter } from "react-icons/tfi"

const NewIndex = () => {
    const { theme } = useTheme()
    const fetcher = useFetcher()
    const [page, setPage] = useState(1)
    const [elephants, setElephants] = useState<ElephantIndexData[]>([])
    const [hasMore, setHasMore] = useState(true)
    const isMounted = useRef(false)
    const [habitat, setHabitat] = useState("")
    const [gender, setGender] = useState("")
    const [species, setSpecies] = useState("")
    const [isFiltering, setIsFiltering] = useState(false)
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [elephantTotal, setElephantTotal] = useState(0)

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("page", page.toString())
        formData.append("habitat", habitat)
        formData.append("gender", gender)
        formData.append("species", species)
        fetcher.submit(formData, { method: "post", action: "/elephants" })
        setIsFiltering(false)
    }

    useEffect(() => {
        if (isMounted.current) {
            if (isFiltering) {
                setElephants([])
            }
            handleSubmit()
        } else {
            isMounted.current = true
        }
    }, [page, habitat, gender, species])

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            setElephants(prevElephants => [...prevElephants, ...fetcher.data.elephants.data])
            setHasMore(fetcher.data.has_more)
            setElephantTotal(fetcher.data.total_elephants)
        }
    }, [fetcher.data, fetcher.state])

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1)
    }

    return (
        <div className={styles.indexContainer}>
            <div className={classNames(styles.filterContainer, { [styles.filterVisible]: isFilterVisible })}>
                <button 
                    className={classNames(styles.filterToggle, { [styles.filterVisible]: isFilterVisible, [styles[theme]]: theme })} 
                    onClick={() => setIsFilterVisible(!isFilterVisible)} 
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <TfiFilter />
                </button>
                <IndexFilter
                    habitat={habitat}
                    gender={gender}
                    species={species}
                    setHabitat={setHabitat}
                    setGender={setGender}
                    setSpecies={setSpecies}
                    setPage={setPage}
                    setIsFiltering={setIsFiltering}
                    isFilterVisible={isFilterVisible}
                    elephantTotal={elephantTotal}
                    isHovering={isHovering}
                />
            </div>
            <div className={classNames(styles.resultsContainer, { [styles.filterVisible]: isFilterVisible })}>
                <InfiniteScroll
                    dataLength={elephants.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className={classNames(styles.elephantList, { [styles.filterVisible]: isFilterVisible })}
                >
                    {elephants.map((elephant: ElephantIndexData, index: number) => (
                        <div key={`${elephant.id}-${index}`}>
                            <ElephantCard elephant={elephant} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default NewIndex