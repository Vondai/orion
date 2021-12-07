import { Link } from 'react-router-dom';

function Post () {

    return (
            <section className='post-listing'>
            <article className='post-listing-logo-wrapper'>
                <i className="fas fa-robot"></i>
            </article>
            <article className='post-listing-wrapper'>
                <section className='post-listing-heading-wrapper'>
                    <p className='post-listing-heading-content'>
                        Lorem ipsum dolor sit amet
                    </p>
                </section>
                <section className='post-listing-details-wrapper'>
                    <div className='post-listing-community-wrapper'>
                        <p className='post-listing-community-content'>
                            <Link to='/community/lorem'>community/lorem</Link>
                        </p>
                    </div>
                    <div className='post-listing-author-wrapper'>
                            <p className='post-listing-author-content'>Posted by <Link to='/user/lorem'>user/lorem</Link>
                            </p>
                    </div>
                    <div className='post-listing-posted-wrapper'>
                            <p className='post-listing-posted-content'>
                                Posted 8h ago.
                            </p>
                    </div>
                </section>
                <section className='post-listing-cta-wrapper'>

                </section>
            </article>
            </section>
    );
}

export default Post;