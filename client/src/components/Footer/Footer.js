import { Link } from 'react-router-dom';
import "./Footer.css";

function Footer () {

    return (
            <footer className='site-footer'>
                <section className='site-map-wrapper'>
                    <ul className='footer-list site-map-listing'>
                        <li className='site-map-listing-item'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='site-map-listing-item'>
                            <Link to='/about' >About</Link>
                        </li>
                    </ul>
                </section>
                <section className='socials'>
                    <ul className='footer-list socials-list'>
                        <li className='socials-list-item'>
                            <a href='https://github.com/Vondai'><i className="fab fa-github"></i>Github</a>
                        </li>
                    </ul>
                </section>
                <section className='rights-wrapper'>
                <p className='rights'>Orion &copy; 2021. All rights reserved</p>
                </section>
            </footer>
    );
}

export default Footer;