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
        }
      }
    }
  }

  const { id, name, bio } = elephant.data.attributes

  return (
    <div>
      <h1>{name}</h1>
      <p>ID: {id}</p>
      <p>Bio: {bio}</p>

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