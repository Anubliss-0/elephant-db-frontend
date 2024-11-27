import React, { useEffect, useState, useRef } from "react"
import { useFetcher } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"

const NewIndex = React.memo(() => {
    const fetcher = useFetcher()
    const [page, setPage] = useState(1)
    const [elephants, setElephants] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const formData = new FormData()
        formData.append("page", page.toString())
        fetcher.submit(formData, { method: "post", action: "/elephants" })
    }, [page])

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            setElephants(prevElephants => [...prevElephants, ...fetcher.data])
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
})

export default NewIndex