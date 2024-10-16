import styles from "./ElephantPhotos.module.scss"

interface ElephantPhotosProps {
    photos: {
        id: string
        url: string
    }[]
    isEditing: boolean
    onSelectPhoto: (photoId: string) => void
}

function ElephantPhotos({ photos, isEditing, onSelectPhoto }: ElephantPhotosProps) {
    return (
      <div>
        {photos.length > 0 ? (
          <div className={styles.photos}>
            {photos.map((photo, index) => (
              <div key={photo.id}>
                <img src={photo.url} alt={`Elephant photo ${index + 1}`} />
                {isEditing && (
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => onSelectPhoto(photo.id)}
                    />
                    Remove
                  </label>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No photos available</p>
        )}
      </div>
    )
  }

export default ElephantPhotos   