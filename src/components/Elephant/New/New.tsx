import { useState, useRef } from "react";
import { Form, useSubmit } from "react-router-dom";

function New() {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const maxFiles = 5;
    const submit = useSubmit();  // React Router's submit function
    const formRef = useRef<HTMLFormElement | null>(null);  // Ref for the form element

    // Handle file selection and create previews
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);

        // Check if the new selection alone exceeds the limit
        if (newFiles.length > maxFiles) {
            setError(`You can only upload a maximum of ${maxFiles} photos.`);
            return;
        }

        // Check if adding the new files exceeds the total file limit
        if (selectedFiles.length + newFiles.length > maxFiles) {
            setError(`You can only upload a maximum of ${maxFiles} photos.`);
            return;
        }

        setError(null);  // Clear any previous errors

        // Add the new files to the existing ones
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);

        // Generate preview URLs for the new files and append to existing previews
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviews]);

        // Clear the file input to allow re-adding the same file
        event.target.value = '';
    };

    // Handle removing a photo
    const handleRemovePhoto = (index: number) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);

        setSelectedFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevent the default form submission

        const formData = new FormData();
        formData.append("name", formRef.current?.name.value || "");
        formData.append("bio", formRef.current?.bio.value || "");

        // Append only the remaining selected files
        selectedFiles.forEach(file => {
            formData.append("photos", file);
        });

        // Submit the form data using React Router's submit function
        submit(formData, { method: "post", encType: "multipart/form-data" });
    };

    return (
        <div>
            <h1>Create a New Elephant</h1>
            <Form method="post" encType="multipart/form-data" ref={formRef} onSubmit={handleSubmit}>
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

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* List of selected file names */}
                {selectedFiles.length > 0 && (
                    <div>
                        <h3>Selected Files:</h3>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index}>
                                    {file.name}
                                    <button type="button" onClick={() => handleRemovePhoto(index)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    );
}

export default New;