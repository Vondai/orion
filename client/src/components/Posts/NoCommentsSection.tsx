const NoCommentsSection = () => {
  return (
    <div className='bg-base-300 p-5 flex flex-col justify-center text-lg rounded-lg items-center'>
      <div className='flex gap-2 items-center'>
        <i className='fas fa-comments text-accent'></i>
        <p>No Comments Yet</p>
      </div>
      <p>Be the first to share what you think!</p>
    </div>
  );
};

export default NoCommentsSection;
