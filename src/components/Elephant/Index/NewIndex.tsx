import { useEffect, useState, useRef } from "react"
import { useFetcher } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
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
    const [isFiltering, setIsFiltering] = useState(false)

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("page", page.toString())
        formData.append("habitat", habitat)
        fetcher.submit(formData, { method: "post", action: "/elephants" })
        setIsFiltering(false)
    }

    useEffect(() => {
        if (isMounted.current) {
            if (isFiltering) {
                setElephants([])
                if (page !== 1) {
                    setPage(1)
                }
            }
            handleSubmit()
        } else {
            isMounted.current = true
        }
    }, [page, habitat])

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
        <>
            <IndexFilter habitat={habitat} setHabitat={setHabitat} setPage={setPage} setIsFiltering={setIsFiltering} />
            <div className={styles.elephantIndex}>
                <InfiniteScroll
                    dataLength={elephants.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className={styles.elephantList}
                >
                    {elephants.map((elephant: ElephantIndexData, index: number) => (
                        <div key={`${elephant.id}-${index}`}>
                            <ElephantCard elephant={elephant} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default NewIndex