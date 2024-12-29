import { useConfirmation } from '../../contexts/ConfirmationContext'
import { useTheme } from '../../contexts/ThemeContext'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button'
import styles from './ConfirmationModal.module.scss'

function ConfirmationModal() {
    const { showWarning, warningMessage, onConfirm, setShowWarning } = useConfirmation()
    const { t } = useTranslation()
    const { theme } = useTheme()

    const handleYes = () => {
        onConfirm()
        setShowWarning(false)
    }

    const handleNo = () => {
        setShowWarning(false)
    }

    return (
        <>
            {
                showWarning && (
                    <div className={styles.confirmationModalContainer}>
                        <div className={classNames(styles.confirmationModal, styles[theme])}>
                            {warningMessage}
                            <div className={styles.confirmationModalButtons}>
                                <Button onClick={handleYes} danger={true}>{t('yes')}</Button>
                                <Button onClick={handleNo}>{t('no')}</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ConfirmationModal