import { useTranslation } from 'react-i18next'
// import styles from '../Edit.module.scss'
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
        <>
            <label className={styles.editFormItem}>
                {t('elephants.name')}
                <input type="text" name="elephant[name]" defaultValue={currentName} onChange={(e) => setCurrentName(e.target.value)} />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.age')}
                <input type="number" name="elephant[age]" defaultValue={age} />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.species')}
                <input type="text" name="elephant[species]" defaultValue={species} />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.gender')}
                <input type="text" name="elephant[gender]" defaultValue={gender} />
            </label>
            <label className={styles.editFormItem}>
                {t('elephants.habitat')}
                <input type="text" name="elephant[habitat]" defaultValue={habitat} />
            </label>
        </>
    )
}

export default ElephantDetailFields
