import { useState, useEffect } from 'react'
import { useLoaderData, Form, useSubmit } from 'react-router-dom'
import { Photo } from '../../../types'
import Photos from '../Photos/Photos'

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

function Show() {
  const { elephant } = useLoaderData() as { elephant: { data: ElephantData } }
  const { name, bio } = elephant.data.attributes
  const [photos, setPhotos] = useState<Photo[]>([]);
  const submit = useSubmit()
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIsTextValid((prev) => ({ ...prev, [name]: value.trim() !== "", }))
  }

  const handlePhotosChange = (updatedPhotos: Photo[]) => {
    setPhotos(updatedPhotos)
  }

  useEffect(() => {
    const initialPhotos = elephant.data.attributes.photos.map((photo, index) => ({
      id: photo.id,
      url: photo.url,
      status: "keep" as const,
      position: index, // Assign initial position
    }));
    setPhotos(initialPhotos);
  }, [elephant.data.attributes.photos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    // Append each photo's data separately
    photos.forEach((photo, index) => {
      formData.append(`elephant[photos_attributes][${index}][id]`, photo.id);
      formData.append(`elephant[photos_attributes][${index}][status]`, photo.status);
      formData.append(`elephant[photos_attributes][${index}][position]`, photo.position);

      // Append file if it exists
      if (photo.file) {
        formData.append(`elephant[photos_attributes][${index}][image]`, photo.file);
      }
    });

    console.log(formData)

    submit(formData, { method: 'PATCH', encType: 'multipart/form-data' });
    setIsEditing(false);
  }

  return (
    <div>
      {elephant.data.attributes.can_edit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </button>
      )}

      <Form method="PATCH" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          {isEditing ? (
            <input type="text" id="name" name="elephant[name]" defaultValue={name} required onChange={handleInputChange} />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          {isEditing ? (
            <input type="text" id="bio" name="elephant[bio]" defaultValue={bio} required onChange={handleInputChange} />
          ) : (
            <span>{bio}</span>
          )}
        </div>

        <Photos photos={photos} onPhotosChange={handlePhotosChange} isEditing={isEditing} />

        {(isEditing) && <button type="submit">Update Elephant</button>}
      </Form>

      {/* {isEditing && (
        <Form method="delete">
          <button type="submit">Delete</button>
        </Form>
      )} */}
    </div>
  )
}

export default Show
