import { useConfirmation } from '../../../contexts/ConfirmationContext'
import { useTheme } from '../../../contexts/ThemeContext'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
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
                                <button onClick={handleYes} className={styles.yesButton}>{t('yes')}</button>
                                <button onClick={handleNo} className={styles.noButton}>{t('no')}</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ConfirmationModal