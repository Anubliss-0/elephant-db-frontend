import Select from "./InputTypes/Select"
import TextArea from "./InputTypes/TextArea"
import styles from "./Input.module.scss"
import classNames from "classnames"
import { useTheme } from "../../contexts/ThemeContext"

type InputType = {
    name: string
    label: string
    type: string
    options?: string[]
    defaultValue?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    required?: boolean
}

function Input({ name, label, type, options, defaultValue, onChange, required }: InputType) {
    const { theme } = useTheme()

    return (
        <label className={classNames(styles.inputLabel, styles[theme])}>
            {label}
            {type === 'select' && options && <Select options={options} name={name} required={required} />}
            {type === 'textarea' && <TextArea name={name} defaultValue={defaultValue} required={required} onChange={onChange} />}
            {type !== 'select' && type !== 'textarea' && <input type={type} name={name} defaultValue={defaultValue} required={required} onChange={onChange} />}
        </label>
    )
}

export default Input
