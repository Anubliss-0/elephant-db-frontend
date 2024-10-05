import { Form } from "react-router-dom"

function New() {
    return (
        <div>
            <h1>Create a New Elephant</h1>
            <Form method="post">
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Bio:
                    <input type="text" name="bio" required />
                </label>

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    );
}

export default New