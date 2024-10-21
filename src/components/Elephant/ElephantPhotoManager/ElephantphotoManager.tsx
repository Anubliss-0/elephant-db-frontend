import { useState, useEffect } from 'react'
import styles from "./ElephantPhotos.module.scss"
import { Photo } from "../../../types"
import { addPhotos, toggleRemovePhoto } from './ElephantphotoManagerUtils'

interface ElephantPhotoManagerProps {
  initialPhotos: {
    id: string
    url: string
  }[]
  isEditing: boolean
  onSubmitPhotos: (photos: Photo[]) => void
}

function ElephantPhotoManager({
  initialPhotos,
  isEditing,
  onSubmitPhotos,
}: ElephantPhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const existingPhotos = initialPhotos.map(photo => ({
      id: photo.id,
      url: photo.url,
      status: "keep" as const,
    }))
    setPhotos(existingPhotos)
  }, [initialPhotos])

  const handleRemovePhoto = (event: React.MouseEvent<HTMLButtonElement>, photoId: string | null) => {
    event.preventDefault(); // Prevent form submission
    setPhotos(prevPhotos => toggleRemovePhoto(prevPhotos, photoId));
  };

  const handleAddPhotos = (files: FileList) => {
    const newPhotosArray = addPhotos(files)
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotosArray])
  }

  useEffect(() => {
    onSubmitPhotos(photos)
  }, [photos, onSubmitPhotos])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleAddPhotos(files)
    }
  }

  return (
    <div>
      {photos.length > 0 ? (
        <div className={styles.photos}>
          {photos.map((photo, index) => (
            <div
              key={photo.id || index}
              className={styles.photoContainer}
              style={{ opacity: photo.status === "deleted" ? 0.5 : 1 }} // Apply opacity when deleted
            >
              {/* Photo */}
              <img src={photo.url} alt={`Elephant photo ${index + 1}`} />

              {/* Show "X" overlay if the photo is flagged for removal */}
              {photo.status === "deleted" && (
                <div className={styles.removalOverlay}>X</div>
              )}

              {/* Remove button for each photo */}
              {isEditing && (
                <button onClick={(event) => handleRemovePhoto(event, photo.id || null)}>
                  {photo.status === "deleted" ? "Undo Remove" : "Remove"}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No photos available</p>
      )}

      {/* File input for adding new photos */}
      {isEditing && (
        <div className={styles.addPhoto}>
          <label>
            Add Photos:
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          </label>
        </div>
      )}
    </div>
  )
}

export default ElephantPhotoManager