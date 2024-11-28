import { Link } from "react-router-dom"
import classNames from "classnames"
import { useTheme } from "../../../contexts/ThemeContext"
import { ElephantIndexData } from "../../../types"
import styles from "./ElephantCard.module.scss"

type ElephantCardProps = {
    elephant: ElephantIndexData
  }

function ElephantCard({ elephant }: ElephantCardProps) {
    const { theme } = useTheme()

    return (
        <Link to={`/elephants/${elephant.id}`} className={classNames(styles.elephantCard, styles[theme])}>
            <div className={styles.elephantCardImage}>
                <img src={elephant.attributes.photo} alt={`Photo of ${elephant.attributes.name}`} />
            </div>
            <div className={styles.elephantCardInfo}>
                <h3>{elephant.attributes.name}</h3>
                <span>Species: {elephant.attributes.species}</span>
                <span>Gender: {elephant.attributes.gender}</span>
                <span>Habitat: {elephant.attributes.habitat}</span>
            </div>
        </Link>
    )
}

export default ElephantCard