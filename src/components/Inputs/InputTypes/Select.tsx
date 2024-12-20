type SelectType = {
    options: string[]
    name: string
    required?: boolean
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({ options, name, required, onChange }: SelectType) {
    return <select name={name} required={required} onChange={onChange}>
        {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        ))}
    </select>
}

export default Select