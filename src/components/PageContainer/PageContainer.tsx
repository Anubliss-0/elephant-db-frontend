import styles from './PageContainer.module.scss'
import { useTheme } from '../../contexts/ThemeContext'
import classNames from 'classnames'
type PageContainerProps = {
    children: React.ReactNode
}

function PageContainer({ children }: PageContainerProps) {
    const { theme } = useTheme()
    return <div className={classNames(styles.pageContainer, styles[theme])}>
        {children}
    </div>
}

export default PageContainer