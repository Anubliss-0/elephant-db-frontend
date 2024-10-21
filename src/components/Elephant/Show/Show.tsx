import { useState, useEffect } from 'react'
import { useLoaderData, Form, useSubmit } from 'react-router-dom'
import styles from "./Show.module.scss"
import ElephantPhotos from '../ElephantPhotos/ElephantPhotos'

function Show() {
  const [isEditing, setIsEditing] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const submit = useSubmit()


  type Photo = {
    id: string | null // null for new photos that haven't been uploaded yet
    url: string
    status: 'keep' | 'deleted' | 'new' // Status to track the state of each photo
    file?: File // Only for new photos
  }

  type ElephantData = {
    id: string
    type: string
    attributes: {
      can_edit: boolean
      id: number
      name: string
      bio: string
      user_id: number
      photos: {
        id: string
        url: string
      }[]
    }
  }

  const { elephant } = useLoaderData() as { elephant: { data: ElephantData } }

  useEffect(() => {
    const existingPhotos = elephant.data.attributes.photos.map(photo => ({
      id: photo.id,
      url: photo.url,
      status: 'keep' as const, // Existing photos are marked as 'keep'
    }))
    setPhotos(existingPhotos)
  }, [elephant])

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === photoId
          ? { ...photo, status: photo.status === 'deleted' ? 'keep' : 'deleted' }
          : photo
      )
    )
  }

  const handleAddPhotos = (files: FileList) => {
    const newPhotosArray = Array.from(files).map(file => ({
      id: null, // New photo, no ID yet
      url: URL.createObjectURL(file), // Generate a preview URL using createObjectURL
      status: "new" as const, // Mark it as a new photo
      file: file, // Store the file for uploading
    }));
  
    // Add the new photos to the existing photos array in state
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    photos.forEach((photo, index) => {
      if (photo.status === "new" && photo.file) {
        // Append new photos (files)
        formData.append(`photos[new][${index}]`, photo.file); // Append the file
      } else if (photo.status === "deleted" && photo.id !== null) {
        // Only append deleted photo IDs if the id is not null
        formData.append(`photos[deleted][]`, String(photo.id)); // Convert to string
      }
    });

    // Submit the formData
    submit(formData, { method: "PATCH", encType: "multipart/form-data" });
    setIsEditing(false)
  };

  const { name, bio } = elephant.data.attributes

  return (
    <div>
      {elephant.data.attributes.can_edit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Stop Editing" : "Start Editing"}
        </button>
      )}

      <Form method="PATCH" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          {isEditing ? (
            <input type="text" id="name" name="name" defaultValue={name} required />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          {isEditing ? (
            <input type="text" id="bio" name="bio" defaultValue={bio} required />
          ) : (
            <span>{bio}</span>
          )}
        </div>
        <ElephantPhotos
          photos={photos}
          isEditing={isEditing}
          onRemovePhoto={handleRemovePhoto}
          onAddPhoto={handleAddPhotos}
        />

        {isEditing && <button type="submit">Update Elephant</button>}
      </Form>

      {isEditing && (
        <Form method="delete">
          <button type="submit">Delete</button>
        </Form>
      )}

    </div>
  )
}

export default Show