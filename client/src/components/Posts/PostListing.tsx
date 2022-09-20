import { Link, useNavigate } from 'react-router-dom';
import { TPost } from '../../types/TPost';
import PostCta from './PostCta';

type TProps = {
  post: TPost;
};
const PostListing: React.FC<TProps> = ({ post }) => {
  const navigate = useNavigate();

  function postClickHandler(e: React.MouseEvent) {
    const target = e.target as Element;
    if (target.tagName === 'A') return;
    post.communityName
      ? navigate(`/community/${post.communityName}/comments/${post.id}`)
      : navigate(`comments/${post.id}`);
  }

  return (
    <>
      <section
        className='flex items-center bg-base-200 rounded-lg p-6 hover:bg-primary-focus cursor-pointer w-full'
        onClick={(e) => postClickHandler(e)}
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
            <div>
              <p>
                Posted by{' '}
                <Link
                  to={`/user/${post.authorName}`}
                  className='hover:text-primary-content font-bold'
                >
                  user/{post.authorName}
                </Link>
              </p>
            </div>
            <div>
              <p>Posted {post.createdOn}.</p>
            </div>
          </section>
          <PostCta
            commentsCount={post.commentsCount}
            postId={post.id}
            communityName={post.communityName}
          />
        </article>
      </section>
      <div className='divider'></div>
    </>
  );
};

export default PostListing;
