const LeaveCommentGuest = () => {
  return (
    <section className='post-comment-anonymous'>
      <span className='post-comment-anonymous-text'>
        Log in or sign up to leave a comment
      </span>
      <div className='post-comment-cta-wrapper'>
        <button className='post-comment-login'></button>
        <button className='post-comment-signup'></button>
      </div>
    </section>
  );
};

export default LeaveCommentGuest;
