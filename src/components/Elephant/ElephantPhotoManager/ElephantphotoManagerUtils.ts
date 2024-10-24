import { Photo } from "../../../types"

export const addPhotos = (files: FileList): Photo[] => {
  return Array.from(files).map(file => ({
    id: null,
    url: URL.createObjectURL(file),
    status: "new" as const,
    file: file,
  }))
}

// Utility function for toggling removal status of photos
export const toggleRemovePhoto = (
  photos: Photo[],
  photoId: string | null,
  index: number | null = null
): Photo[] => {
  return photos.map((photo, i) => {
    if ((index !== null && i === index) || (photoId && photo.id === photoId)) {
      if (photo.status === "new") {
        return null; // Remove new photo
      } else if (photo.status === "deleted") {
        return { ...photo, status: "keep" };
      } else {
        return { ...photo, status: "deleted" };
      }
    }
    return photo;
  }).filter((photo): photo is Photo => photo !== null);
};