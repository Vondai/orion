import { TComment } from '../Posts/Post';

type TProps = {
  comment: TComment;
};

const Comment: React.FC<TProps> = ({ comment }) => {
  return (
    <>
      <div className='bg-base-300 rounded-lg p-4 flex flex-col gap-4'>
        <section className='flex justify-between'>
          <p className=''>{comment.author}</p>
          <p className=''>{comment.createdOn}</p>
        </section>
        <section className=''>
          <p className=''>{comment.content}</p>
        </section>
      </div>
      <div className='divider'></div>
    </>
  );
};

export default Comment;
