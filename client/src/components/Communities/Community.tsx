import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AboutCommunity from './AboutCommunity';
import PostsListingFilterButtons from '../Posts/PostsListingFilterButtons';
import PostListing from '../Posts/PostListing';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound';
import { useAuth } from '../../contexts/AuthContext';
import CreateModal from '../Posts/CreateModal';
import { NotificationContext } from '../Notifications/NotificationProvider';
import {
  fetchCommunity,
  manageCommunity
} from '../../services/communityService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TPost } from '../../types/TPost';

// type TPost = {
//   id: string;
//   title: string;
//   authorName: string;
//   commentsCount: number;
//   createdOn: string;
// };
// type TCommunity = {
//   name: string;
//   members: number;
//   createdOn: string;
//   description: string;
//   userIsCreator: boolean;
//   userIsMember: boolean;
//   posts: TPost[];
// };
const Community = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { communityName } = useParams();
  const dispatch = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);
  const [postError, setPostError] = useState('');
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const token: string = currentUser.token;
  const joinCommunityMutation = useMutation(() =>
    manageCommunity(communityName!, token, 'join')
  );
  const {
    isLoading,
    isError,
    data: community
  } = useQuery(['community'], () => fetchCommunity(communityName!, token), {
    retry: false,
    refetchOnWindowFocus: false
  });

  function handleCreatePostClick() {
    setPostError('');
    setIsOpen(true);
  }

  // function createPostSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const { title, content } = Object.fromEntries(
  //     new FormData(e.currentTarget)
  //   );
  //   console.log(title);

  //   // if (title.length < 5) {
  //   //   return setPostError('Title must be atleast five characters.');
  //   // }
  //   // if (content.length < 5) {
  //   //   return setPostError('Content must be atleast five characters.');
  //   // }
  //   setLoading(true);
  //   postService
  //     .create(title, content, communityName, token)
  //     .then((data) => {
  //       dispatch({
  //         type: 'ADD_NOTIFICATION',
  //         payload: {
  //           type: 'SUCCESS',
  //           message: 'Post successfully published.'
  //         }
  //       });
  //       navigate(`/community/${communityName}/comments/${data.message}`);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       dispatch({
  //         type: 'ADD_NOTIFICATION',
  //         payload: {
  //           type: 'ERROR',
  //           message: "Couldn't publish post."
  //         }
  //       });
  //     });
  // }

  const handleJoinCtaClick = async () => {
    if (!isAuthenticated) return navigate('/login');

    const result = await joinCommunityMutation.mutateAsync();
    if (result.message === 'User joined successfuly') {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'SUCCESS',
          message: 'Successfully joined.'
        }
      });
      queryClient.invalidateQueries(['community']);
    }
    if (joinCommunityMutation.isError) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'ERROR',
          message: result.message
        }
      });
    }
  };

  if (isLoading) {
    return <h1>We are loading...</h1>;
  }

  if (isError) {
    return <PageNotFound />;
  }

  return (
    <main className='site-content-wrapper'>
      <div className='main-content'>
        <PostsListingFilterButtons />
        <section className='post-content-wrapper'>
          {community.posts.map((post: TPost) => (
            <PostListing
              key={post.id}
              post={post}
            />
          ))}
        </section>
      </div>
      <div className='side-wrapper'>
        <AboutCommunity
          communityDetails={community}
          handleCreatePostClick={handleCreatePostClick}
          handleJoinCtaClick={handleJoinCtaClick}
          loading={loading}
        />
        <Footer />
      </div>
      {/* <CreateModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        createPostSubmitHandler={createPostSubmitHandler}
        postError={postError}
        loading={loading}
      ></CreateModal> */}
    </main>
  );
};

export default Community;
