import { useTranslation } from 'react-i18next'
import * as ElephantOptions from '../../../../constants/elephantOptions'
import styles from './ElephantDetailFields.module.scss'
import Input from '../../../../components/Inputs/Input'

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
            <Input
                label={t('elephants.name')}
                type="text"
                name="elephant[name]"
                defaultValue={currentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentName(e.target.value)}
                required
            />

            <Input
                label={t('elephants.age')}
                type="number"
                name="elephant[age]"
                defaultValue={age}
                required
            />

            <Input
                label={t('elephants.species')}
                type="select"
                options={ElephantOptions.speciesOptions}
                name="elephant[species]"
                defaultValue={species}
                required
            />

            <Input
                label={t('elephants.gender')}
                type="select"
                options={ElephantOptions.genderOptions}
                name="elephant[gender]"
                defaultValue={gender}
                required
            />

            <Input
                label={t('elephants.habitat')}
                type="select"
                options={ElephantOptions.habitatOptions}
                name="elephant[habitat]"
                defaultValue={habitat}
                required
            />
        </div>
    )
}

export default ElephantDetailFields
