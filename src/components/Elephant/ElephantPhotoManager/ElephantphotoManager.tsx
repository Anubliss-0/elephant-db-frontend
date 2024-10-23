import { useState, useEffect } from 'react'
import classNames from 'classnames'
import styles from "./ElephantPhotoManager.module.scss"
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

function ElephantPhotoManager({ initialPhotos, isEditing, onSubmitPhotos, }: ElephantPhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const isCounterInvalid = photos.length > 5 || photos.length == 0

  useEffect(() => {
    const existingPhotos = initialPhotos.map(photo => ({
      id: photo.id,
      url: photo.url,
      status: "keep" as const,
    }))
    setPhotos(existingPhotos)
  }, [initialPhotos])

  const handleRemovePhoto = (
    event: React.MouseEvent<HTMLButtonElement>,
    photoId: string | null,
    index: number | null = null // Add index as a parameter for new photos
  ) => {
    event.preventDefault(); // Prevent form submission

    // Update photos state
    setPhotos(prevPhotos => toggleRemovePhoto(prevPhotos, photoId, index));
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

  const counterClass = classNames(styles.photoCounter, { [styles.counterInvalid]: isCounterInvalid })

  return (
    <div>
      <div className={styles.photos}>
        {photos.map((photo, index) => {
          const photoContainerClass = classNames(styles.photoContainer, { [styles.deleting]: photo.status === "deleted", })
          return (
            <div
              key={photo.id || `new-photo-${index}`}
              className={photoContainerClass}
            >
              <img src={photo.url} alt={`Elephant photo ${index + 1}`} />
              {isEditing && (
                <button onClick={(event) => handleRemovePhoto(event, photo.id || null, photo.id === null ? index : null)}>
                  {photo.status === "deleted" ? "Undo Remove" : "Remove"}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {isEditing && (
        <div className={styles.addPhoto}>
          <label>
            Add Photos:
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          </label>
        </div>
      )}

      <div className={classNames(counterClass)}>
        {`${photos.length} / 5`}
      </div>
    </div>
  )
}

export default ElephantPhotoManager