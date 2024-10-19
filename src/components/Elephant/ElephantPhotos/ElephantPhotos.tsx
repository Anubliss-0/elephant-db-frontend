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
  onAddPhoto: (file: File) => void; // New function to handle photo addition
}

const ElephantPhotos: React.FC<ElephantPhotosProps> = ({
  photos,
  isEditing,
  onRemovePhoto,
  onAddPhoto,
}) => {
  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddPhoto(file); // Trigger the parent function to add the new photo
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
            Add Photo:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      )}
    </div>
  );
};

export default ElephantPhotos;