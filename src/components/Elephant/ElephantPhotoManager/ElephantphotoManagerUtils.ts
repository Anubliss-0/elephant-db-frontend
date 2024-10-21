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
export const toggleRemovePhoto = (
  photos: Photo[],
  photoId: string | null,
  index: number | null = null // Add index to uniquely identify new photos
): Photo[] => {
  return photos
    .map((photo, i) => {
      // Handle new photos by filtering them out (remove from array if index matches)
      if (index !== null && i === index && photo.status === "new") {
        return null; // Remove this photo by returning null
      }

      // Toggle status for existing photos between "keep" and "deleted"
      if (photo.id === photoId && photo.status !== "new") {
        return { ...photo, status: photo.status === "deleted" ? "keep" : "deleted" };
      }

      return photo; // Return unchanged photo for all other cases
    })
    .filter((photo): photo is Photo => photo !== null); // Type guard to filter out null values
};