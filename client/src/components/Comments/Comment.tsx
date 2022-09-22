import { TComment } from '../Posts/Post';

type TProps = {
  comment: TComment;
};

const Comment: React.FC<TProps> = ({ comment }) => {
  return (
    <div className='comment'>
      <section className='comment-info-wrapper'>
        <p className='comment-info-author'>{comment.author}</p>
        <p className='comment-info-time'>{comment.createdOn}</p>
      </section>
      <section className='comment-content-wrapper'>
        <p className='comment-content-text'>{comment.content}</p>
      </section>
    </div>
  );
};

export default Comment;
