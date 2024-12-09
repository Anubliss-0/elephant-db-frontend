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
  onInvalidStatusChange: (isInvalid: boolean) => void
  onSubmitPhotos: (photos: Photo[]) => void
}

function ElephantPhotoManager({ initialPhotos, isEditing, onSubmitPhotos, onInvalidStatusChange }: ElephantPhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const filteredPhotos = photos.filter(photo => photo.status !== "deleted")
  const isCountValid = filteredPhotos.length >= 1 && filteredPhotos.length <= 5

  useEffect(() => {
    onInvalidStatusChange(isCountValid)
  }, [isCountValid, onInvalidStatusChange])

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

  const counterClass = classNames(styles.photoCounter, { [styles.counterInvalid]: !isCountValid })

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
        {`${filteredPhotos.length} / 5`}
      </div>
    </div>
  )
}

export default ElephantPhotoManager