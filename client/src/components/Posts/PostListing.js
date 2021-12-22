import { Link } from 'react-router-dom';
import PostCta from './PostCta';
import "./Posts.css";

function PostListing ({ post }) {

    const linkToCommunity = (
        <div className='post-listing-community-wrapper'>
            <p className='post-listing-community-content'>
                <Link to={`community/${post.communityName}`}>community/{post.communityName}</Link>
            </p>
        </div>
    );

    return (
            <section className='post-listing'>
                <article className='post-listing-logo-wrapper'>
                    <i className="fas fa-robot"></i>
                </article>
                <article className='post-listing-wrapper'>
                    <section className='post-listing-heading-wrapper'>
                        <p className='post-listing-heading-content'>
                            {post.title}
                        </p>
                    </section>
                    <section className='post-listing-details-wrapper'>
                        {post.communityName && linkToCommunity}
                        <div className='post-listing-author-wrapper'>
                                <p className='post-listing-author-content'>Posted by <Link to={`/user/${post.authorName}`}>user/{post.authorName}</Link>
                                </p>
                        </div>
                        <div className='post-listing-posted-wrapper'>
                                <p className='post-listing-posted-content'>
                                    Posted {post.createdOn}.
                                </p>
                        </div>
                    </section>
                    <PostCta commentsCount={post.commentsCount} postId={post.id} />
                </article>
            </section>
    );
}

export default PostListing;