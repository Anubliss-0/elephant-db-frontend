import { useLoaderData, Form } from 'react-router-dom'

function Show() {
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

  const { id, name, bio } = elephant.data.attributes
  console.log(elephant)
  return (
    <div>
      <h1>{name}</h1>
      <p>ID: {id}</p>
      <p>Bio: {bio}</p>

      
      {elephant.data.attributes.photos.length > 0 ? (
        <div>
          {elephant.data.attributes.photos.map((photoUrl, index) => (
            <img key={index} src={photoUrl} alt={`Elephant photo ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>No photos available</p>
      )}

      <Form method="delete">
        <button type="submit">Delete</button>
      </Form>

      <Form method="PATCH">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Bio:
          <input type="text" name="bio" required />
        </label>

        <button type="submit">Edit Elephant</button>
      </Form>
    </div>
  )
}

export default Show