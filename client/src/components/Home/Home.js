import Posts from "./Posts";
import TopCommunities from "../Communities/TopCommunities";

function Home () {

    return (
        <div className='site-content-wrapper'>
            <Posts />
            <TopCommunities />
        </div>
    );
}

export default Home;