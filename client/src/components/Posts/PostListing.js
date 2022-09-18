import { Link, useNavigate } from 'react-router-dom';
import PostCta from './PostCta';

function PostListing({ post }) {
  const navigate = useNavigate();

  function postClickHandler(e) {
    if (e.target.tagName === 'A') return;
    post.communityName
      ? navigate(`/community/${post.communityName}/comments/${post.id}`)
      : navigate(`comments/${post.id}`);
  }

  return (
    <section
      className='flex items-center bg-base-200 rounded-lg p-6 hover:bg-primary-focus cursor-pointer w-full'
      onClick={postClickHandler}
    >
      <article className='w-1/6 text-4xl'>
        <i className='fas fa-robot hover:scale-110'></i>
      </article>
      <article className='w-3/4'>
        <section className='text-2xl font-bold hover:text-primary-content'>
          <p>{post.title}</p>
        </section>
        <section className='flex justify-between'>
          <div>
            <Link
              to={`community/${post.communityName}`}
              className='hover:text-primary-content font-bold'
            >
              community/{post.communityName}
            </Link>
          </div>
          <div className=''>
            <p className=''>
              Posted by{' '}
              <Link
                to={`/user/${post.authorName}`}
                className='hover:text-primary-content font-bold'
              >
                user/{post.authorName}
              </Link>
            </p>
          </div>
          <div className=''>
            <p className=''>Posted {post.createdOn}.</p>
          </div>
        </section>
        <PostCta
          commentsCount={post.commentsCount}
          postId={post.id}
          communityName={post.communityName}
        />
      </article>
    </section>
  );
}

export default PostListing;
