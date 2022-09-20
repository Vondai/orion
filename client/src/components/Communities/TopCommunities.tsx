import { fetchTopCommunities } from '../../services/communityService';
import CommunityListingItem from './CommunityListingItem';
import CommunityListItemSkeleton from '../skeletons/CommunityListItemSkeleton';
import { useQuery } from '@tanstack/react-query';

type TTopCommunity = {
  id: string;
  name: string;
};
function TopCommunities() {
  const {
    isLoading,
    isSuccess,
    isError,
    data: topCommunities
  } = useQuery(
    ['topCommunities'],
    () => fetchTopCommunities<TTopCommunity[]>(),
    {
      retry: 3
    }
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <aside className='flex flex-col items-center'>
      <section>
        <p className='text-lg text-center font-semibold'>
          Most subscribed communities
        </p>
      </section>
      <section>
        <ol>
          {isLoading && (
            <>
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
              <CommunityListItemSkeleton />
            </>
          )}
          {isSuccess &&
            topCommunities.map((community) => (
              <CommunityListingItem
                key={community.id}
                name={community.name}
              />
            ))}
        </ol>
      </section>
    </aside>
  );
}

export default TopCommunities;
