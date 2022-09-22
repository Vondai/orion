import { SubmitHandler, useForm } from 'react-hook-form';
const MAX_COMMENT_LENGTH = 300;
interface IFormInput {
  comment: string;
}
type TProps = {
  commentCreateHandler: (data: { comment: string }) => void;
};
const LeaveCommentArea: React.FC<TProps> = ({ commentCreateHandler }) => {
  const { register, formState, handleSubmit, watch, reset } =
    useForm<IFormInput>({
      mode: 'onChange'
    });
  const commentSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    commentCreateHandler(data);
    reset();
  };
  const commentValueLength = isNaN(
    MAX_COMMENT_LENGTH - watch('comment')?.length
  )
    ? MAX_COMMENT_LENGTH
    : MAX_COMMENT_LENGTH - watch('comment').length;

  return (
    <section>
      <form
        className='flex flex-col gap-3'
        onSubmit={handleSubmit(commentSubmitHandler)}
      >
        <label htmlFor='comment'>Leave your comment</label>
        <textarea
          {...register('comment', {
            required: true,
            minLength: 1,
            maxLength: MAX_COMMENT_LENGTH
          })}
          id='comment'
          name='comment'
          className='textarea textarea-accent text-lg resize-none h-32'
          maxLength={MAX_COMMENT_LENGTH}
        ></textarea>
        <div className='flex justify-end items-center gap-2'>
          <span>{commentValueLength}/300</span>
          <button
            className='btn btn-outline btn-accent w-1/3 self-end text-primary-content'
            type='submit'
            disabled={!formState.isValid}
          >
            Comment
          </button>
        </div>
      </form>
    </section>
  );
};

export default LeaveCommentArea;
