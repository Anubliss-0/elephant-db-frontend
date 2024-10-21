import { useState, useEffect } from 'react'
import ElephantPhotos from '../ElephantPhotos/ElephantPhotos'
import { Photo } from '../../../types'

interface ElephantPhotoManagerProps {
  initialPhotos: { id: string; url: string }[]; // Photos from backend
  isEditing: boolean;
  onPhotosChange: (photos: Photo[]) => void; // Callback to update photos in the parent component
}

function ElephantPhotoManager({
  initialPhotos,
  isEditing,
  onPhotosChange,
}: ElephantPhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Initialize photos from backend
  useEffect(() => {
    const existingPhotos = initialPhotos.map(photo => ({
      id: photo.id,
      url: photo.url,
      status: "keep" as const, // Existing photos are marked as 'keep'
    }));
    setPhotos(existingPhotos);
  }, [initialPhotos]);

  useEffect(() => {
    onPhotosChange(photos); // Notify parent component when photos state changes
  }, [photos, onPhotosChange]);

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === photoId
          ? { ...photo, status: photo.status === 'deleted' ? 'keep' : 'deleted' }
          : photo
      )
    );
  };

  const handleAddPhotos = (files: FileList) => {
    const newPhotosArray = Array.from(files).map(file => ({
      id: null, // New photo, no ID yet
      url: URL.createObjectURL(file), // Generate a preview URL using createObjectURL
      status: "new" as const, // Mark it as a new photo
      file: file, // Store the file for uploading
    }));

    // Add the new photos to the existing photos array in state
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotosArray]);
  };

  return (
    <div>
      <ElephantPhotos
        photos={photos}
        isEditing={isEditing}
        onRemovePhoto={handleRemovePhoto}
        onAddPhoto={handleAddPhotos}
      />
    </div>
  );
}

export default ElephantPhotoManager;