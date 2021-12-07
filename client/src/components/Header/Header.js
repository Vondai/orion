import { Link } from 'react-router-dom';
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
                <Link className="cta-register" to="/register">Sign Up</Link>
            </nav>
        </header>
    )
};

export default Header;