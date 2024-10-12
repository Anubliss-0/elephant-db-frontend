import styles from "./ElephantPhotos.module.scss"

interface ElephantPhotosProps {
    photos: string[]
}

function ElephantPhotos({ photos }: ElephantPhotosProps) {
    return (
        <div>
            {photos.length > 0 ? (
                <div className={styles.photos}>
                    {photos.map((photoUrl, index) => (
                        <img key={index} src={photoUrl} alt={`Elephant photo ${index + 1}`} />
                    ))}
                </div>
            ) : (
                <p>No photos available</p>
            )}
        </div>
    )
}

export default ElephantPhotos