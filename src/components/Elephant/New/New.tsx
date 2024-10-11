import { useState } from "react"
import { Form, useSubmit } from "react-router-dom"
import PhotoUploader from "../PhotoUploader/PhotoUploader"

function New() {
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const submit = useSubmit()
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("bio", bio)

        selectedFiles.forEach(file => {
            formData.append("photos", file)
        })

        submit(formData, { method: "post", encType: "multipart/form-data" })
    }

    return (
        <div>
            <h1>Create a New Elephant</h1>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Bio:
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} required />
                </label>

                <PhotoUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    )
}

export default New