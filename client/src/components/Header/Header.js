function Header () {
    return (
        <section className="site-header">
            <section className="site-logo">
                <a href="/">
                    Orion
                </a>
            </section>
            <nav className="nav-bar">
                <a className="cta-login" href="/login">Login</a>
                <a className="cta-register" href="/register">Sign Up</a>
            </nav>
        </section>
    )
};

export default Header;