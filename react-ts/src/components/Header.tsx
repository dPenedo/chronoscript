import { Link } from 'react-router-dom';
import '../App.css';

export default function Header() {
    return (
        <>
        <nav className="navbar">
                        <Link className="nav__link" to="/countdown">
                            Countdown
                        </Link>
                        <Link className="nav__link" to="/world-times">
                            World-Times
                        </Link>
        </nav>
        </>
    );
}
