import { Link } from 'react-router-dom';
import "./Header.css";

function Header () {
    return (
        <header className="site-header">
            <section className="site-logo">
                <Link to='/'>
                    Orion
                </Link>
            </section>
            <nav className="nav-bar">
                <Link className="cta-login" to="/login">Log in</Link>
                <Link className="cta-signup" to="/signup">Sign Up</Link>
            </nav>
        </header>
    )
};

export default Header;