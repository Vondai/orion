import { Link } from 'react-router-dom';
import "./Header.css";
import { useAuth } from '../../contexts/AuthContext';
import SignedInNavigation from './SignedInNavigation'

function Header () {

    const { currentUser } = useAuth();

    return (
        <header className="site-header">
            <section className="site-logo">
                <Link to='/'>
                    Orion
                </Link>
            </section>
            <nav className="nav-bar">
                {
                    currentUser.username
                    ? <SignedInNavigation username={currentUser.username} /> 
                    :<>
                        <Link className="cta-login" to="/login">Log in</Link>
                        <Link className="cta-signup" to="/signup">Sign Up</Link>
                    </>
                }
            </nav>
        </header>
    )
};

export default Header;