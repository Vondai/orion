import { Link } from 'react-router-dom';
function CommunityListingItem () {

    return (
        <li className='highlight-listing-item'>
            <Link className='community-link' to='/community/lorem'>
                <i className="fas fa-arrow-up"></i>
                comunity/lorem
            </Link>
        </li>
    );
}

export default CommunityListingItem;