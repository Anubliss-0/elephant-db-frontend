import classNames from 'classnames'
import styles from './Button.module.scss'
import { useTheme } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  to?: string
  state?: any
  className?: string
  danger?: boolean
}

function Button({ children, onClick, disabled = false, type = 'button', to, state, className, danger = false }: ButtonProps) {
  const { theme } = useTheme()
  
  const buttonClasses = classNames(
    styles.button,
    { [styles.disabled]: disabled },
    { [styles.danger]: danger },
    styles[theme],
    className
  )

  if (to) {
    return (
      <Link
        to={to}
        state={state}
        className={buttonClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    )
  }

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