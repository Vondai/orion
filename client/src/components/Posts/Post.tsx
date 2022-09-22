import { Link, useParams } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationContext } from '../Notifications/NotificationProvider';
import useClickOutside from '../../hooks/useClickOutside';
import { fetchById } from '../../services/postService';
import Footer from '../Footer/Footer';
import PostCta from './PostCta';
import Comment from '../Comments/Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LeaveCommentArea from './LeaveCommentArea';
import LeaveCommentGuest from './LeaveCommentGuest';
import NoCommentsSection from './NoCommentsSection';
import AboutAuthor from '../Users/AboutAuthor';
import { createComment } from '../../services/commentService';

export type TComment = {
  id: string;
  content: string;
  author: string;
  createdOn: string;
};
type TAuthor = {
  username: string;
  totalPosts: number;
};
type TPost = {
  id: string;
  title: string;
  description: string;
  author: TAuthor;
  createdOn: string;
  commentsCount: number;
  comments: TComment[];
};
type TNewCommentResponse = {
  commentId: string;
};
function Post() {
  const { isAuthenticated, currentUser } = useAuth();
  const sortingPickerRef = useRef<HTMLDivElement>(null);
  const dispatch = useContext(NotificationContext);
  const { communityName, postId } = useParams();
  const [openCommentSortingPicker, setOpenCommentSortingPicker] =
    useState(false);
  const queryClient = useQueryClient();
  const token = currentUser.token;
  const {
    isLoading,
    isError,
    data: post
  } = useQuery(['post', postId], () => fetchById<TPost>(postId!));

  const createCommentMutation = useMutation(
    createComment<TNewCommentResponse>,
    {
      onSuccess: (data) => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'SUCCESS',
            message: 'Successfully added your comment.'
          }
        });
        queryClient.invalidateQueries(['post']);
      },
      onError: () => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'ERROR',
            message: "Couldn't post your comment."
          }
        });
      }
    }
  );
  const commentCreateHandler = (data: { comment: string }) => {
    if (!postId) return;
    createCommentMutation.mutateAsync({ comment: data.comment, postId, token });
  };
  // function sortingClickBtnHandler() {
  //   setOpenCommentSortingPicker((prev) => !prev);
  // }
  // useClickOutside(sortingPickerRef, () => {
  //   if (openCommentSortingPicker) setOpenCommentSortingPicker(false);
  // });
  if (isLoading) {
    return <div>We are loading this content.</div>;
  }
  if (isError) {
    return <div>There was a problem.</div>;
  }
  return (
    <section className='flex justify-between items-start h-full'>
      <section className='flex flex-col gap-3 bg-base-200 w-2/4 px-5 py-3 rounded-lg'>
        <section className='flex justify-around items-center'>
          <div className='w-6 h-6'>
            <Link to={`/community/${communityName}`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 448 512'
                className='fill-accent hover:fill-primary-content cursor-pointer'
              >
                <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
              </svg>
            </Link>
          </div>
          <div>
            <p>
              Posted by{' '}
              <Link to={`/user/${post.author.username}`}>
                user/
                <span className='hover:text-primary-content font-bold'>
                  {post.author.username}
                </span>
              </Link>
            </p>
          </div>
          <div>
            <p>Posted {post.createdOn}</p>
          </div>
        </section>
        <div>
          <p className=' text-3xl font-bold'>{post.title}</p>
        </div>
        <article>
          <p className='text-slate-200 text-2xl'>{post.description}</p>
        </article>
        <PostCta
          commentsCount={post.commentsCount}
          postId={post.id}
          communityName={communityName!}
        />
        {isAuthenticated ? (
          <LeaveCommentArea commentCreateHandler={commentCreateHandler} />
        ) : (
          <LeaveCommentGuest />
        )}
        <section>
          <div>
            <button
              type='button'
              //onClick={sortingClickBtnHandler}
            >
              <span>Sort by: Best</span>
            </button>
            <i className='fas fa-sort-down'></i>
          </div>
          <div
            className={`sorting-picker ${
              openCommentSortingPicker ? 'active' : ''
            }`}
            ref={sortingPickerRef}
          >
            <Link to='?sort=best'>
              <button>Best</button>
            </Link>
            <Link to='?sort=top'>
              <button>Top</button>
            </Link>
            <Link to='?sort=new'>
              <button>New</button>
            </Link>
            <Link to='?sort=old'>
              <button>Old</button>
            </Link>
          </div>
        </section>
        <section>
          {post.commentsCount === 0 ? (
            <NoCommentsSection />
          ) : (
            post.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
              />
            ))
          )}
        </section>
      </section>
      <AboutAuthor author={post.author} />
    </section>
  );
}

export default Post;
