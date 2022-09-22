const LeaveCommentArea = () => {
  return (
    <section className='post-leave-comment-wrapper'>
      <form
        className='post-leave-comment-form'
        //onSubmit={commentSubmitHandler}
      >
        <label htmlFor='leave-comment'>Leave a comment</label>
        <textarea
          id='leave-comment'
          className='post-leave-comment'
          rows={10}
          cols={10}
          name='comment'
          // onChange={(e) =>
          //   e.target.value ? setLoading(false) : setLoading(true)
          // }
        ></textarea>
        <button
          className='leave-comment-cta'
          type='submit'
          //disabled={loading}
        >
          Comment
        </button>
      </form>
    </section>
  );
};

export default LeaveCommentArea;
