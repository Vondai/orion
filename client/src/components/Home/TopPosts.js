import { Link } from 'react-router-dom';

function TopPosts () {

    return (
        <main className='site-content'>
            <article className='posts-banner'>
                <div className='hot-posts-wrapper'>
                    <Link className='hot-posts-cta' to='/posts/hot'>Hot</Link>
                </div>
                <div className='new-posts-wrapper'>
                    <Link className='new-posts-cta' to='/posts/new'>New</Link>
                </div>
            </article>
        </main>
    );
}

export default TopPosts;