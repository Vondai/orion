import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AboutCommunity from './AboutCommunity';
import PostsListingFilterButtons from '../Posts/PostsListingFilterButtons';
import PostListing from '../Posts/PostListing';
import PageNotFound from '../PageNotFound';
import { useAuth } from '../../contexts/AuthContext';
import CreatePostModal from '../Posts/CreatePostModal';
import { NotificationContext } from '../Notifications/NotificationProvider';
import { fetchCommunity, joinCommunity } from '../../services/communityService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostListingSkeleton from '../skeletons/PostListingSkeleton';
import { TCommunity } from '../../types/TCommunity';
import AuthModal from '../AuthModal';
type TJoinResponse = {
  message: string;
};
const Community = () => {
  const { communityName } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useContext(NotificationContext);
  const { currentUser, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const token: string = currentUser.token;
  const joinCommunityMutation = useMutation(
    () => joinCommunity<TJoinResponse>(communityName!, token),
    {
      onSuccess: (data) => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'SUCCESS',
            message: data.message
          }
        });
        queryClient.invalidateQueries(['community']);
      },
      onError: (error: any) => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'ERROR',
            message: error.message
          }
        });
      }
    }
  );
  useEffect(() => {
    return () => {
      setIsAuthModalOpen(false);
    };
  }, [isAuthenticated, queryClient]);
  const {
    isLoading,
    isSuccess,
    isError,
    data: community
  } = useQuery(
    ['community', communityName, token],
    () => fetchCommunity<TCommunity>(communityName!, token),
    {
      retry: false,
      refetchOnWindowFocus: false
    }
  );

  function handleCreatePostBtnClick() {
    setIsCreatePostModalOpen(true);
  }

  const handleJoinBtnClick = async () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    await joinCommunityMutation.mutateAsync();
  };

  if (isError) {
    return <PageNotFound />;
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
            community.posts.map((post) => (
              <PostListing
                key={post.id}
                post={post}
              />
            ))}
        </div>
        <div className='w-1/3 p-4 bg-base-200 rounded-lg'>
          {isSuccess && (
            <AboutCommunity
              community={community}
              handleJoinBtnClick={handleJoinBtnClick}
              handleCreatePostBtnClick={handleCreatePostBtnClick}
            />
          )}
        </div>
      </div>
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
      <CreatePostModal
        isCreatePostModalOpen={isCreatePostModalOpen}
        setIsCreatePostModalOpen={setIsCreatePostModalOpen}
      />
    </>
  );
};

export default Community;
