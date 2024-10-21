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
export const toggleRemovePhoto = (photos: Photo[], photoId: string | null): Photo[] => {
  return photos
    .map(photo => {
      // Handle new photos by filtering them out (remove from array)
      if (photo.id === photoId && photo.status === "new") {
        return null; // Mark for removal by returning null
      }

      // Toggle status for existing photos between "keep" and "deleted"
      if (photo.id === photoId) {
        return { ...photo, status: photo.status === "deleted" ? "keep" : "deleted" };
      }

      return photo; // Return unchanged photo for all other cases
    })
    .filter((photo): photo is Photo => photo !== null); // Type guard to filter out null values
};