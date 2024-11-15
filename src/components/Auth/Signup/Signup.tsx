import { Form } from "react-router-dom"

function Signup() {
    return (
        <div>
            <Form method="POST" encType="multipart/form-data">
                <input type="email" name="user[email]" placeholder="email" required />
                <input type="text" name="user[profile_attributes][name]" placeholder="name" required />
                <input type="text" name="user[profile_attributes][gender]" placeholder="gender"  />
                <input type="text" name="user[profile_attributes][location]" placeholder="location"  />
                <input type="file" name="user[profile_attributes][profileimage]" accept="image/*" />
                <input type="password" name="user[password]" placeholder="password" required />
                <button type="submit">Signup</button>
            </Form>
        </div>
    )
}

export default Signup