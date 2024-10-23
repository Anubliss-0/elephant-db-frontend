import { useState, useEffect } from 'react'
import { useLoaderData, Form, useSubmit } from 'react-router-dom'
import { Photo } from '../../../types'
import ElephantPhotoManager from '../ElephantPhotoManager/ElephantphotoManager'
import styles from './Show.module.scss'

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
  const { name, bio, photos } = elephant.data.attributes
  const submit = useSubmit()
  const [isEditing, setIsEditing] = useState(false)
  const [finalPhotos, setFinalPhotos] = useState<Photo[]>([])
  const [arePhotosValid, setArePhotosInvalid] = useState(true)
  const [isTextValid, setIsTextValid] = useState({
    name: true,
    bio: true,
  })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(arePhotosValid && isTextValid.name && isTextValid.bio)
  }, [arePhotosValid, isTextValid])

  const handleInvalidStatus = (status: boolean) => {
    setArePhotosInvalid(status)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIsTextValid((prev) => ({ ...prev, [name]: value.trim() !== "", }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    finalPhotos.forEach((photo, index) => {
      if (photo.status === "new" && photo.file) {
        formData.append(`photos[new][${index}]`, photo.file)
      } else if (photo.status === "deleted" && photo.id !== null) {
        formData.append(`photos[deleted][]`, String(photo.id))
      }
    })

    submit(formData, { method: 'PATCH', encType: 'multipart/form-data' })
    setIsEditing(false)
  }

  return (
    <div>
      {elephant.data.attributes.can_edit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </button>
      )}

      <Form method="PATCH" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          {isEditing ? (
            <input type="text" id="name" name="name" defaultValue={name} required onChange={handleInputChange} />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          {isEditing ? (
            <input type="text" id="bio" name="bio" defaultValue={bio} required onChange={handleInputChange} />
          ) : (
            <span>{bio}</span>
          )}
        </div>

        <ElephantPhotoManager
          initialPhotos={photos}
          isEditing={isEditing}
          onInvalidStatusChange={handleInvalidStatus}
          onSubmitPhotos={setFinalPhotos}
        />

        {(isEditing) && <button type="submit" disabled={!isFormValid}>Update Elephant</button>}
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