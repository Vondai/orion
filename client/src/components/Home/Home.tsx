import PostsListingFilterButtons from '../Posts/PostsListingFilterButtons';
import PostListing from '../Posts/PostListing';
import { fetchTrendingPosts } from '../../services/postService';
import PostListingSkeleton from '../skeletons/PostListingSkeleton';
import { useQuery } from '@tanstack/react-query';
import { TPost } from '../../types/TPost';
import TopCommunities from '../Communities/TopCommunities';

function Home() {
  const {
    isLoading,
    isSuccess,
    isError,
    data: posts
  } = useQuery(['trendingPosts'], () => fetchTrendingPosts<TPost[]>(), {
    retry: 3
  });
  if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <>
      <div className='flex justify-between gap-28 items-start'>
        <div className='w-3/4'>
          <div className='bg-base-200 py-5 mb-3 rounded-lg'>
            <PostsListingFilterButtons />
          </div>
          {isLoading && (
            <>
              <PostListingSkeleton />
              <PostListingSkeleton />
              <PostListingSkeleton />
              <PostListingSkeleton />
            </>
          )}
          {isSuccess &&
            posts.map((post) => (
              <PostListing
                key={post.id}
                post={post}
              />
            ))}
        </div>
        <div className='w-1/3 p-4 bg-base-200 rounded-lg'>
          <TopCommunities />
        </div>
      </div>
    </>
  );
}

export default Home;
