import { useTranslation } from 'react-i18next'
import * as ElephantOptions from '../../../../constants/elephantOptions'
import styles from './ElephantDetailFields.module.scss'

type ElephantDetailsProps = {
    currentName: string
    setCurrentName: (name: string) => void
    age: number;
    species: string;
    gender: string;
    habitat: string;
}

function ElephantDetailFields({ currentName, setCurrentName, age, species, gender, habitat }: ElephantDetailsProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.detailFieldsContainer}>
            <label className={styles.editFormItem}>
                {t('elephants.name')}
                <input type="text" name="elephant[name]" defaultValue={currentName} onChange={(e) => setCurrentName(e.target.value)} required />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.age')}
                <input type="number" name="elephant[age]" defaultValue={age} required />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.species')}
                <select name="elephant[species]" defaultValue={species} required>
                    {ElephantOptions.speciesOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.gender')}
                <select name="elephant[gender]" defaultValue={gender} required>
                    {ElephantOptions.genderOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.habitat')}
                <select name="elephant[habitat]" defaultValue={habitat} required>
                    {ElephantOptions.habitatOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default ElephantDetailFields
