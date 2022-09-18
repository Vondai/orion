import { useEffect, useState } from 'react';
import PostsListingFilterButtons from '../Posts/PostsListingFilterButtons';
import PostListing from '../Posts/PostListing';
import TopCommunities from '../Communities/TopCommunities';
import * as postService from '../../services/postService';
import PostListingSkeleton from '../skeletons/PostListingSkeleton';

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
      <div className='flex justify-between gap-28 items-start'>
        <div className='w-3/4'>
          <div className='bg-base-200 py-5 mb-3 rounded-lg'>
            <PostsListingFilterButtons />
          </div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostListing
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <>
              <PostListingSkeleton />
              <PostListingSkeleton />
              <PostListingSkeleton />
              <PostListingSkeleton />
            </>
          )}
        </div>
        <div className='w-1/3'>
          <TopCommunities />
        </div>
      </div>
    </>
  );
}

export default Home;
