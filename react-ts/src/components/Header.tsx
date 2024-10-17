import { Link } from 'react-router-dom';
import styles from './header.module.css'
import '../App.css';

export default function Header() {
    return (
        <>
        <nav className={styles.navbar}>
                        <Link className={styles.navbar__link} to="/countdown">
                            Countdown
                        </Link>
                        <Link className={styles.navbar__link} to="/world-times">
                            World-Times
                        </Link>
        </nav>
        </>
    );
}
