import { useEffect, useState } from "react";
import PostsListingNavigation from "../Posts/PostsListingNavigation";
import PostListing from "../Posts/PostListing";
import TopCommunities from "../Communities/TopCommunities";
import * as postService from "../../services/postService";
import Footer from "../Footer/Footer";

function Home () {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAll()
        .then(postData => {
            setPosts(postData);
        })
        .catch(err => console.log(err))
    }, [])




    return (
        <>
        <main className='site-content-wrapper'>
        <div className='main-content'>
            <PostsListingNavigation />
            {posts.map(post => <PostListing key={post.id} post={post} />)}
        </div>

            <div>
                <TopCommunities />
                <Footer />
            </div>
        </main>
        </>
    );
}

export default Home;