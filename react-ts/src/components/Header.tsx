import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css'
import '../App.css';

export default function Header() {

    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
        <nav className={styles.navbar}>
                { currentPath !== '/' &&
                    (
                        <Link className={styles.navbar__link} to="/">
                            Stopwatch
                        </Link>
                    )
                }
                {
                    currentPath !== '/countdown' && (
                        <Link className={styles.navbar__link} to="/countdown">
                            Countdown
                        </Link>
                    )
                } {
                    currentPath !== '/world-times' && (

                        <Link className={styles.navbar__link} to="/world-times">
                            World-Times
                        </Link>
                    )


                }
        </nav>
        </>
    );
}
