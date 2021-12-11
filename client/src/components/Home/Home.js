import Posts from "./Posts";
import TopCommunities from "../Communities/TopCommunities";
import Footer from "../Footer/Footer";
import "./Posts.css";

function Home () {

    return (
        <>
        <main className='site-content-wrapper'>
            <Posts />
            <div>
                <TopCommunities />
                <Footer />
            </div>
        </main>
        </>
    );
}

export default Home;