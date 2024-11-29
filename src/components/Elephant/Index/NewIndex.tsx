import { useEffect, useState, useRef } from "react"
import { useFetcher } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import classNames from "classnames"
import ElephantCard from "../ElephantCard/ElephantCard"
import { ElephantIndexData } from "../../../types"
import styles from "./index.module.scss"
import IndexFilter from "./IndexFilter/IndexFilter"

const NewIndex = () => {
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
        }
    }, [fetcher.data, fetcher.state])

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1)
    }

    return (
        <div className={styles.indexContainer}>
            <button className={styles.filterToggle} onClick={() => setIsFilterVisible(!isFilterVisible)}>
                {isFilterVisible ? "Hide Filter" : "Show Filter"}
            </button>
            <div className={classNames(styles.filterContainer, { [styles.filterVisible]: isFilterVisible })}>
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