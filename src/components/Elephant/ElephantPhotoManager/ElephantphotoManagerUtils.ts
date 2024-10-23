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
    // Handle new photos using index
    if (index !== null && i === index) {
      // Toggle new photo's status between "new" and remove (null)
      return photo.status === "new" ? null : { ...photo, status: "new" };
    }

    // Handle existing photos using photoId
    if (photoId && photo.id === photoId) {
      // Toggle status between "deleted" and "keep"
      return { ...photo, status: photo.status === "deleted" ? "keep" : "deleted" };
    }

    return photo; // Return unchanged photo for all other cases
  }).filter((photo): photo is Photo => photo !== null); // Filter out removed (null) photos
};