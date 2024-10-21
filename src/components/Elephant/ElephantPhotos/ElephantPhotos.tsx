import React from "react";
import styles from "./ElephantPhotos.module.scss";

interface Photo {
  id: string | null; // null for new photos
  url: string;
  status: "keep" | "deleted" | "new";
  file?: File; // Optional: only for new photos
}

interface ElephantPhotosProps {
  photos: Photo[];
  isEditing: boolean;
  onRemovePhoto: (photoId: string) => void;
  onAddPhoto: (file: FileList) => void; // New function to handle photo addition
}

function ElephantPhotos({
  photos,
  isEditing,
  onRemovePhoto,
  onAddPhoto,
}: ElephantPhotosProps) {
  // Handle file input change
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files; // Get the FileList from the input
    if (files && files.length > 0) {
      onAddPhoto(files); // Pass the entire FileList to the parent function
    }
  }

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
                    onChange={() => onRemovePhoto(photo.id || "")}
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

export default ElephantPhotos;