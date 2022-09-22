import { Link, useParams } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationContext } from '../Notifications/NotificationProvider';
import useClickOutside from '../../hooks/useClickOutside';
import { fetchById } from '../../services/postService';
import Footer from '../Footer/Footer';
import PostCta from './PostCta';
import Comment from '../Comments/Comment';
import { useQuery } from '@tanstack/react-query';
import LeaveCommentArea from './LeaveCommentArea';
import LeaveCommentGuest from './LeaveCommentGuest';
import NoCommentsSection from './NoCommentsSection';
import AboutAuthor from '../Users/AboutAuthor';

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
function Post() {
  const { isAuthenticated, currentUser } = useAuth();
  const sortingPickerRef = useRef<HTMLDivElement>(null);
  const dispatch = useContext(NotificationContext);
  const { communityName, postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [openCommentSortingPicker, setOpenCommentSortingPicker] =
    useState(false);

  const {
    isLoading,
    isSuccess,
    isError,
    data: post
  } = useQuery(['post', postId], () => fetchById<TPost>(postId!));

  // function commentSubmitHandler(e:any) {
  //   const form = e.currentTarget;
  //   e.preventDefault();
  //   const { comment } = Object.fromEntries(new FormData(e.currentTarget));
  //   if (!comment) return;
  //   setLoading(true);
  //   commentService
  //     .create(comment, postId, token)
  //     .then((data) => {
  //       setComments((oldComments) => [data, ...oldComments]);
  //       form.reset();
  //       dispatch({
  //         type: 'ADD_NOTIFICATION',
  //         payload: {
  //           type: 'SUCCESS',
  //           message: 'Successfully added your comment.'
  //         }
  //       });
  //     })
  //     .catch(() => {
  //       dispatch({
  //         type: 'ADD_NOTIFICATION',
  //         payload: {
  //           type: 'ERROR',
  //           message: "Couldn't post your comment."
  //         }
  //       });
  //       setLoading(false);
  //     });
  // }
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
    <section className='flex justify-between gap-28 items-start'>
      <section className='flex flex-col gap-3 bg-base-200 w-2/3 px-5 py-3 rounded-lg'>
        <section className='flex justify-around'>
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
        {isAuthenticated ? <LeaveCommentArea /> : <LeaveCommentGuest />}
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
