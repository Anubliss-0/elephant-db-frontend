import { useState } from "react"
import { Form, useSubmit } from "react-router-dom"
import PhotoUploader from "../PhotoUploader/PhotoUploader"
import { Photo } from "../../../types"

function New() {
    const [photos, setPhotos] = useState<Photo[]>([])
    const submit = useSubmit()

    const handlePhotosChange = (updatedPhotos: Photo[]) => {
        setPhotos(updatedPhotos)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        photos.forEach((photo, index) => {
            formData.append(`elephant[photos_attributes][${index}][position]`, photo.position.toString())
            if (photo.file) {
                formData.append(`elephant[photos_attributes][${index}][image]`, photo.file)
            }
        })
        submit(formData, { method: 'post', encType: 'multipart/form-data' })
    }

    return (
        <div>
            <h1>Create a New Elephant</h1>
            <Form method="post" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="elephant[name]" required />
                </label>
                <label>
                    Bio:
                    <input type="text" name="elephant[bio]" required />
                </label>

                <PhotoUploader photos={photos} onPhotosChange={handlePhotosChange} />

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    )
}

export default New