import { Link } from 'react-router-dom';
import PostListing from './PostListing';

function PostsListing () {

    return (
        <div className='site-content'>
            <article className='posts-banner'>
                <div className='posts-wrapper hot-posts-wrapper'>
                    <Link className='hot-posts-cta' to='/posts/hot'><i className="fab fa-hotjar"></i>Hot</Link>
                </div>
                <div className='posts-wrapper new-posts-wrapper'>
                    <Link className='new-posts-cta' to='/posts/new'><i className="fas fa-certificate"></i>New</Link>
                </div>
            </article>
            <section className='post-content-wrapper'>
                <PostListing />
            </section>
        </div>
    );
}

export default PostsListing;