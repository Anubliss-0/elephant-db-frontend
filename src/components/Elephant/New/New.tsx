import { useState, useId } from "react"
import { Form, useSubmit } from "react-router-dom"
import * as ElephantOptions from "../../../constants/elephantOptions"
import classNames from 'classnames'
import styles from './New.module.scss'
import { useTheme } from "../../../contexts/ThemeContext"
import ElephantPhotos from "../Edit/ElephantPhotos/Elephantphotos"
import { PhotoFormData } from "../../../types"

function New() {
    const { theme } = useTheme()
    const submit = useSubmit()
    const [photos, setPhotos] = useState<PhotoFormData[]>([])
    const fileInputId = useId()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        photos.forEach((photo, index) => {
            formData.append(`elephant[photos_attributes][${index}][id]`, photo.id.toString())
            formData.append(`elephant[photos_attributes][${index}][position]`, photo.position.toString())
            formData.append(`elephant[photos_attributes][${index}][status]`, photo.status)
            if (photo.image) {
                formData.append(`elephant[photos_attributes][${index}][image]`, photo.image)
            }
        })

        submit(formData, { method: 'POST', encType: 'multipart/form-data' })
    }

    const containerClasses = classNames(
        styles.new,
        styles[theme],
        'desktopContainer',
        { dark: theme === 'dark' }
    )

    return (
        <div className={containerClasses}>
            <h1>Create a New Elephant</h1>
            <Form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="elephant[name]" required />
                </label>
                <label>
                    Bio:
                    <textarea name="elephant[bio]" required></textarea>
                </label>
                <label>
                    Age:
                    <input type="number" name="elephant[age]" required min="0" />
                </label>
                <label>
                    Species:
                    <select name="elephant[species]" required>
                        <option value="">Select a species</option>
                        {ElephantOptions.speciesOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Gender:
                    <select name="elephant[gender]" required>
                        <option value="">Select a gender</option>
                        {ElephantOptions.genderOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Habitat:
                    <select name="elephant[habitat]" required>
                        <option value="">Select a habitat</option>
                        {ElephantOptions.habitatOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>

                <ElephantPhotos
                    photos={photos}
                    fileInputId={fileInputId}
                    setPhotos={setPhotos}
                />

                <button type="submit">Create Elephant</button>
            </Form>
        </div>
    )
}

export default New