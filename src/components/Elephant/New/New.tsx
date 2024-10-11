import { Form } from "react-router-dom";

function New() {
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

                {/* File input for multiple files */}
                <label>
                    Photos:
                    <input
                        type="file"
                        name="photos"  // Make sure this matches your backend's field name
                        multiple  // Allow multiple files
                        accept="image/*"  // Limit to image files
                    />
                </label>

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    );
}

export default New;