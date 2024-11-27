import { Link } from "react-router-dom"
import styles from "./ElephantCard.module.scss"

type ElephantCardProps = {
    elephant: {
      id: number
      type: string
      attributes: {
        name: string
        photo: string
      }
    }
  }

function ElephantCard({ elephant }: ElephantCardProps) {
    return (
        <Link to={`/elephants/${elephant.id}`} className={styles.elephantCard}>
            <span>{elephant.attributes.name}</span>
            <img src={elephant.attributes.photo} alt={`Photo of ${elephant.attributes.name}`} />
        </Link>
    )
}

export default ElephantCard