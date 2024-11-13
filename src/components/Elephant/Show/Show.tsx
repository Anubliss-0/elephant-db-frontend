import { useState, useEffect } from 'react'
import { useUser } from '../../../contexts/UserContext'
import { useLoaderData, Form, useSubmit } from 'react-router-dom'
import { Photo } from '../../../types'
import Photos from '../Photos/Photos'
import * as ElephantOptions from '../../../constants/elephantOptions'
type ElephantData = {
  id: string
  type: string
  attributes: {
    can_edit: boolean
    id: number
    name: string
    bio: string
    age: number
    species: string
    gender: string
    habitat: string
    user_id: number
    photos: {
      id: string
      url: string
    }[]
  }
}

function Show() {
  const { userId } = useUser()
  const { elephant } = useLoaderData() as { elephant: { data: ElephantData } }
  const { name, bio, age, species, gender, habitat } = elephant.data.attributes
  const [photos, setPhotos] = useState<Photo[]>([]);
  const submit = useSubmit()
  const [isEditing, setIsEditing] = useState(false)

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
      {userId === elephant.data.attributes.user_id && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </button>
      )}

      <Form method="PATCH" onSubmit={handleSubmit}>
        <div>
          <label>Name:
            {isEditing ? (
              <input type="text" id="name" name="elephant[name]" defaultValue={name} required />
            ) : (
              <span>{name}</span>
            )}
          </label>
        </div>
        <div>
          <label>Bio:
            {isEditing ? (
              <input type="text" id="bio" name="elephant[bio]" defaultValue={bio} required />
            ) : (
              <span>{bio}</span>
            )}
          </label>
        </div>
        <div>
          <label>Age:
            {isEditing ? (
              <input type="number" id="age" name="elephant[age]" defaultValue={age} />
            ) : (
              <span>{age}</span>
            )}
          </label>
        </div>
        <div>
          <label>Species:
            {isEditing ? (
              <select id="species" name="elephant[species]" defaultValue={species} required>
                {ElephantOptions.speciesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <span>{species}</span>
            )}
          </label>
        </div>
        <div>
          <label>Gender:
            {isEditing ? (
              <select id="gender" name="elephant[gender]" defaultValue={gender} required>
                {ElephantOptions.genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <span>{gender}</span>
            )}
          </label>
        </div>
        <div>
          <label>Habitat:
            {isEditing ? (
              <select id="habitat" name="elephant[habitat]" defaultValue={habitat} required>
                {ElephantOptions.habitatOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <span>{habitat}</span>
            )}
          </label>
        </div>
        <Photos photos={photos} onPhotosChange={handlePhotosChange} isEditing={isEditing} />

        {(isEditing) && <button type="submit">Update Elephant</button>}
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
