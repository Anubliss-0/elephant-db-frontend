import { useEffect, useState } from "react"
import { useFetcher } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"

interface IndexElephantData {
    id: number
    type: string
    attributes: {
        id: number
        name: string
        photo: string
    }
}

const NewIndex = () => {
    const fetcher = useFetcher()
    const [page, setPage] = useState(1)
    const [elephants, setElephants] = useState<IndexElephantData[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const formData = new FormData()
        formData.append("page", page.toString())
        fetcher.submit(formData, { method: "post", action: "/elephants" })
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
        <div>
            <InfiniteScroll
                dataLength={elephants.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more elephants to load</p>}
            >
                {elephants.map((elephant: any, index: number) => (
                    <div key={`${elephant.id}-${index}`}>
                        <h3>Elephant ID: {elephant.id}</h3>
                        <p>Type: {elephant.type}</p>
                        <p>Attributes: {JSON.stringify(elephant.attributes)}</p>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default NewIndex