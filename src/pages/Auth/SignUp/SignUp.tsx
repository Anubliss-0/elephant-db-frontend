import { Form } from "react-router-dom"
import Input from "../../../components/Inputs/Input"
import ProfilePhotoUpload from "../../../components/ProfilePhotoUpload/ProfilePhotoUpload"

function SignUp() {
    return (
        <div>
            <Form method="POST" encType="multipart/form-data">
                <Input type="email" name="user[email]" placeholder="email" required label="Email" />
                <Input type="text" name="user[profile_attributes][name]" placeholder="name" required label="Name" />
                <Input type="text" name="user[profile_attributes][gender]" placeholder="gender" label="Gender" />
                <Input type="text" name="user[profile_attributes][location]" placeholder="location" label="Location" />
                <ProfilePhotoUpload imageUrl="" name="user[profile_attributes][profileimage]" />
                <Input type="password" name="user[password]" placeholder="password" required label="Password" />
                <button type="submit">Signup</button>
            </Form>
        </div>
    )
}

export default SignUp