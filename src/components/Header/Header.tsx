import { FunctionComponent } from "react"
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"


interface props {
    cartCount?: number
}
export default function Header(props: props) {
    return (
        <header className={`${styles.navbar} shadow`}>
            <div className="container flex justify-between">
                <ul className={styles.nav}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul className={styles.nav}>
                    <li>
                        <Link to="/cart">
                            {props.cartCount && <span className={styles.badge}>{props.cartCount}</span>}
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )

} 