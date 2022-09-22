import { SubmitHandler, useForm } from 'react-hook-form';
const MAX_COMMENT_LENGTH = 300;
interface IFormInput {
  comment: string;
}
const LeaveCommentArea = () => {
  const { register, reset, setError, formState, handleSubmit, watch } =
    useForm<IFormInput>({
      mode: 'onChange'
    });
  const commentValue = MAX_COMMENT_LENGTH - watch('comment').length;
  const commentSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

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
            maxLength: 300
          })}
          id='comment'
          name='comment'
          className='textarea textarea-accent text-lg resize-none h-32'
        ></textarea>
        <div className='flex justify-end items-center gap-2'>
          <span>{commentValue}/300</span>
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
