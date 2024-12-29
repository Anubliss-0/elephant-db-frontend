import { useFetcher } from 'react-router-dom'
import { ElephantIndexData } from '../../../types'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './NewIndex.module.scss'
import { useState, useEffect } from 'react'

function NewIndex() {
    const [elephants, setElephants] = useState<ElephantIndexData[]>([])
    const [hasMore, setHasMore] = useState(false)
    const [totalElephants, setTotalElephants] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const fetcher = useFetcher()

    useEffect(() => {
        fetcher.load(`/elephants?page=1`)
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
        fetcher.load(`/elephants?page=${currentPage + 1}`)
    }
    
    return (
        <div>
            <div className={styles.debug}>
                <p>totalElephants: {totalElephants}</p>
                <p>currentPage: {currentPage}</p>
                <p>hasMore: {hasMore ? "true" : "false"}</p>
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
                        <img src={elephant.attributes.photo} alt={elephant.attributes.name} className={styles.elephantImage}/>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default NewIndex

// Add a loading wheel or something to show that the page is loading
// Or maybe dont render until it has data?