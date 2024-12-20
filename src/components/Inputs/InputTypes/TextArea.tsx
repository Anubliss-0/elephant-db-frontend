type TextAreaType = {
    name: string
    defaultValue?: string | number
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    required?: boolean
}

function TextArea({ name, defaultValue, onChange, required }: TextAreaType) {
    return (
        <textarea
            name={name}
            defaultValue={defaultValue !== undefined ? defaultValue.toString() : undefined}
            required={required}
            onChange={onChange}
        />
    )
}

export default TextArea