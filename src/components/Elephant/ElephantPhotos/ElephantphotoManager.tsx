import { useState, useEffect } from 'react';
import styles from "./ElephantPhotos.module.scss";
import { Photo } from "../../../types";
import { addPhotos, toggleRemovePhoto } from './ElephantphotoManagerUtils';

function ElephantPhotoManager({
  initialPhotos,
  isEditing,
  onSubmitPhotos,
}: {
  initialPhotos: { id: string; url: string }[];
  isEditing: boolean;
  onSubmitPhotos: (photos: Photo[]) => void;
}) {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Initialize photos from backend
  useEffect(() => {
    const existingPhotos = initialPhotos.map(photo => ({
      id: photo.id,
      url: photo.url,
      status: "keep" as const,
    }));
    setPhotos(existingPhotos);
  }, [initialPhotos]);

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(prevPhotos => toggleRemovePhoto(prevPhotos, photoId));
  };

  const handleAddPhotos = (files: FileList) => {
    const newPhotosArray = addPhotos(files);
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotosArray]);
  };

  // When the form is submitted, pass the final photos state to the parent
  useEffect(() => {
    onSubmitPhotos(photos);
  }, [photos, onSubmitPhotos]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleAddPhotos(files);
    }
  };

  return (
    <div>
      {photos.length > 0 ? (
        <div className={styles.photos}>
          {photos.map((photo, index) => (
            <div key={photo.id || index} className={styles.photoContainer}>
              {/* Photo */}
              <img src={photo.url} alt={`Elephant photo ${index + 1}`} />

              {/* Show "X" overlay if the photo is flagged for removal */}
              {photo.status === "deleted" && (
                <div className={styles.removalOverlay}>X</div>
              )}

              {/* Checkbox to mark for removal or keep */}
              {isEditing && (
                <label>
                  <input
                    type="checkbox"
                    checked={photo.status === "deleted"}
                    onChange={() => handleRemovePhoto(photo.id || "")}
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
  );
}

export default ElephantPhotoManager;