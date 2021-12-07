import TopPosts from "./TopPosts";
import TopCommunities from "../Communities/TopCommunities";

function Home () {

    return (
        <div className='site-content-wrapper'>
            <TopPosts />
            <TopCommunities />
        </div>
    );
}

export default Home;