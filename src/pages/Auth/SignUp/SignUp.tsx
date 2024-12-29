import { Form } from "react-router-dom"
import Input from "../../../components/Inputs/Input"
import ProfilePhotoUpload from "../../../components/ProfilePhotoUpload/ProfilePhotoUpload"
import styles from "./SignUp.module.scss"
import classNames from "classnames"
import i18n from "../../../i18n"
import Button from "../../../components/Button/Button"

function SignUp() {
    return (
        <div className={classNames(styles.signup)}>
            <h1>{i18n.t("signup.title")}</h1>
            <Form method="POST" encType="multipart/form-data" className={classNames(styles.signupFormGrid)}>
                <div className={classNames(styles.detailsArea)}>
                    <Input type="email" name="user[email]" placeholder={i18n.t("signup.email")} required label={i18n.t("signup.email")} />
                    <Input type="text" name="user[profile_attributes][name]" placeholder={i18n.t("signup.name")} required label={i18n.t("signup.name")} />
                    <Input type="text" name="user[profile_attributes][gender]" placeholder={i18n.t("signup.gender")} label={i18n.t("signup.gender")} />
                    <Input type="text" name="user[profile_attributes][location]" placeholder={i18n.t("signup.location")} label={i18n.t("signup.location")} />
                    <Input type="password" name="user[password]" placeholder={i18n.t("signup.password")} required label={i18n.t("signup.password")} />
                </div>
                <div className={classNames(styles.imageArea)}>
                    <ProfilePhotoUpload imageUrl="" name="user[profile_attributes][profileimage]" />
                </div>
                <div className={classNames(styles.submitArea)}>
                    <Button type="submit">{i18n.t("signup.submit")}</Button>
                </div>
            </Form>
        </div>
    )
}

export default SignUp