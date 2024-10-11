import { useState } from "react"

interface PhotoUploaderProps {
    selectedFiles: File[]
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>
}

function PhotoUploader({ selectedFiles, setSelectedFiles }: PhotoUploaderProps) {
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const maxFiles = 5

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || [])

        if (newFiles.length > maxFiles || selectedFiles.length + newFiles.length > maxFiles) {
            setError(`You can only upload a maximum of ${maxFiles} photos.`)
            return
        }

        setError(null)
        const updatedFiles = [...selectedFiles, ...newFiles]
        setSelectedFiles(updatedFiles)

        const newPreviews = newFiles.map(file => URL.createObjectURL(file))
        setPreviewUrls([...previewUrls, ...newPreviews])
        event.target.value = ''
    }

    const handleRemovePhoto = (index: number) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index)
        const updatedPreviews = previewUrls.filter((_, i) => i !== index)
        setSelectedFiles(updatedFiles)
        setPreviewUrls(updatedPreviews)
    }

    return (
        <div>
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

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {previewUrls.length > 0 && (
                <div>
                    <h3>Photo Previews:</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {previewUrls.map((url, index) => (
                            <div key={index}>
                                <img
                                    src={url}
                                    alt={`Selected photo ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <button type="button" onClick={() => handleRemovePhoto(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PhotoUploader