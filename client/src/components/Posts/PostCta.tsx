import { Link } from 'react-router-dom';

type TProps = {
  postId: string;
  communityName: string;
  commentsCount: number;
};
const PostCta: React.FC<TProps> = ({
  commentsCount,
  postId,
  communityName
}) => {
  return (
    <section className='flex gap-6'>
      <div className='flex gap-1 items-center'>
        <i className='fas fa-comments text-accent'></i>
        <Link
          to={
            communityName
              ? `/community/${communityName}/comments/${postId}`
              : `comments/${postId}`
          }
          className='hover:text-accent-content'
        >
          {commentsCount === 0 ? 'Comment' : `${commentsCount} Comments`}
        </Link>
      </div>
      <div className='flex items-center gap-1'>
        <i className='fas fa-share text-accent'></i>
        <Link
          to=''
          className='hover:text-accent-content'
        >
          Share
        </Link>
      </div>
    </section>
  );
};

export default PostCta;
