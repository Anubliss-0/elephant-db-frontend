import { Photo } from "../../../types"

// Utility function for adding photos
export const addPhotos = (files: FileList): Photo[] => {
  return Array.from(files).map(file => ({
    id: null,
    url: URL.createObjectURL(file),
    status: "new" as const,
    file: file,
  }))
}

// Utility function for toggling removal status of photos
export const toggleRemovePhoto = (photos: Photo[], photoId: string): Photo[] => {
  return photos.map(photo =>
    photo.id === photoId
      ? { ...photo, status: photo.status === 'deleted' ? 'keep' : 'deleted' }
      : photo
  )
}