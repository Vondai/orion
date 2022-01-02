import { useEffect, useState } from "react";
import PostsListingNavigation from "../Posts/PostsListingNavigation";
import PostListing from "../Posts/PostListing";
import TopCommunities from "../Communities/TopCommunities";
import * as postService from "../../services/postService";
import Footer from "../Footer/Footer";
import PostListingSkeleton from "../skeletons/PostListingSkeleton";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getAll()
      .then((postData) => {
        if (postData) {
          setPosts(postData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="site-content-wrapper">
        <div className="main-content">
          <PostsListingNavigation />
          {posts.length > 0 ? (
            posts.map((post) => <PostListing key={post.id} post={post} />)
          ) : (
            <>
            <PostListingSkeleton />
            <PostListingSkeleton />
            <PostListingSkeleton />
            <PostListingSkeleton />
            </>
          )}
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
