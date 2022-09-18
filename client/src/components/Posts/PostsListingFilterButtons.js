import { Link } from 'react-router-dom';

function PostsListingFilterButtons() {
  return (
    <article className='flex justify-evenly font-bold mb-3'>
      <div className='btn-post-filter'>
        <i className='fab fa-hotjar'></i>
        <Link
          className=''
          to='/posts/hot'
        >
          Hot
        </Link>
      </div>
      <div className='btn-post-filter'>
        <i className='fas fa-certificate'></i>
        <Link
          className=''
          to='/posts/new'
        >
          New
        </Link>
      </div>
    </article>
  );
}

export default PostsListingFilterButtons;
