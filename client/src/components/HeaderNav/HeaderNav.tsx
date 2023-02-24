import styles from './header-nav.module.css'
import {Link} from "react-router-dom";

const HeaderNav = () => {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Link to={`/`} className={styles.item}>Работы</Link>
                <Link to={`/experience`} className={styles.item}>Опыт</Link>
                <Link to={`/contacts`} className={styles.item}>Связь</Link>
            </nav>
        </div>
    );
}

export default HeaderNav;