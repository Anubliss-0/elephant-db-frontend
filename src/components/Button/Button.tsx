import classNames from 'classnames'
import styles from './Button.module.scss'
import { useTheme } from '../../contexts/ThemeContext'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

function Button({ children, onClick, disabled = false, type = 'button' }: ButtonProps) {
  const { theme } = useTheme()
  
  const buttonClasses = classNames(
    styles.button,
    { [styles.disabled]: disabled },
    styles[theme]
  )
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  )
}

export default Button