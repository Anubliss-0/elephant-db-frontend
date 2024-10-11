import { useState } from "react"
import { Form } from "react-router-dom"

function New() {
    const [previewUrls, setPreviewUrls] = useState<string[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        const filePreviews = files.map(file => URL.createObjectURL(file))
        setPreviewUrls(filePreviews)
    }

    return (
        <div>
            <h1>Create a New Elephant</h1>
            <Form method="post" encType="multipart/form-data">
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Bio:
                    <input type="text" name="bio" required />
                </label>

                <label>
                    Photos:
                    <input
                        type="file"
                        name="photos"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>

                {previewUrls.length > 0 && (
                    <div>
                        <h3>Photo Previews:</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {previewUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Selected photo ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    )
}

export default New