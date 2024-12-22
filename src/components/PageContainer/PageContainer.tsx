import styles from './PageContainer.module.scss'
import { useTheme } from '../../contexts/ThemeContext'
import classNames from 'classnames'

type PageContainerProps = {
    children: React.ReactNode
}

function PageContainer({ children }: PageContainerProps) {
    const { theme } = useTheme()
    return <div className={classNames(styles.pageContainer, styles[theme])}>
        <div className={classNames(styles.pageContent, styles[theme])}>
            {children}
        </div>
    </div>
}

export default PageContainer