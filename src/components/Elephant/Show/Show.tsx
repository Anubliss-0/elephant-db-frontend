import { useState } from 'react'
import { useLoaderData, Form } from 'react-router-dom'
import styles from "./Show.module.scss"
import ElephantPhotos from '../ElephantPhotos/ElephantPhotos'

function Show() {
  const [isEditing, setIsEditing] = useState(false)
  const { elephant } = useLoaderData() as {
    elephant: {
      data: {
        id: string
        type: string
        attributes: {
          id: number
          name: string
          bio: string
          user_id: number
          photos: string[]
        }
      }
    }
  }

  const { name, bio, photos } = elephant.data.attributes

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Stop Editing" : "Start Editing"}
      </button>

      <Form method="PATCH" onSubmit={() => setIsEditing(false)}>
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

        {isEditing && <button type="submit">Update Elephant</button>}
      </Form>
      
      <ElephantPhotos photos={photos} />

      <Form method="delete">
        <button type="submit">Delete</button>
      </Form>

    </div>
  )
}

export default Show