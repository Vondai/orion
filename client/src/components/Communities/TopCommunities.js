import CommunityListingItem from "./CommunityListingItem";
import "./Communities.css";

function TopCommunities () {

    return (
        <aside className='site-highlight'>
            <section className='highlight-header-wrapper'>
                <p className='highlight-header'>
                    Most subscribed communities
                </p>
            </section>
            <section className='highlight-content-wrapper'>
                <ol className='highlight-listing'>
                    <CommunityListingItem />
                    <CommunityListingItem />
                    <CommunityListingItem />
                    <CommunityListingItem />
                    <CommunityListingItem />
                </ol>
            </section>
        </aside>
    );
}

export default TopCommunities;