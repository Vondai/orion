import { Link } from 'react-router-dom';
function CommunityListingItem ({ name }) {

    return (
        <li className='highlight-listing-item'>
                <Link className='community-link' to={`/community/${name}`}>
                        <i className="fas fa-arrow-up"></i>
                        comunity/{ name }
                </Link>
        </li>
    );
}

export default CommunityListingItem;