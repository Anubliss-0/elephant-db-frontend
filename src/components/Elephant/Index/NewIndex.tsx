import { useEffect, useState, useRef } from "react"
import { useFetcher } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import ElephantCard from "../ElephantCard/ElephantCard"
import { ElephantIndexData } from "../../../types"
import styles from "./index.module.scss"

const NewIndex = () => {
    const fetcher = useFetcher()
    const [page, setPage] = useState(1)
    const [elephants, setElephants] = useState<ElephantIndexData[]>([])
    const [hasMore, setHasMore] = useState(true)
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            const formData = new FormData()
            formData.append("page", page.toString())
            fetcher.submit(formData, { method: "post", action: "/elephants" })
        } else {
            isMounted.current = true
        }
    }, [page])

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
        <div className={styles.elephantIndex}>
            <InfiniteScroll
                dataLength={elephants.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more elephants to load</p>}
                className={styles.elephantList}
            >
                {elephants.map((elephant: ElephantIndexData, index: number) => (
                    <div key={`${elephant.id}-${index}`}>
                        <ElephantCard elephant={elephant} />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default NewIndex