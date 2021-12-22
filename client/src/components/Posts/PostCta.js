import { Link } from "react-router-dom";
import "./PostCta.css";

function PostCta ({ commentsCount, postId }) {

    return (
        <section className='post-cta-wrapper'>
        <div className='post-comment-wrapper'>
            <Link to={`/lorem/${postId}`} className="post-cta post-comment-cta">
                <i className="fas fa-comments"></i>
                {commentsCount === 0 ? 'Comment' : `${commentsCount} Comments`}
            </Link>
        </div>
        <div className='post-share-wrapper'>
            <Link to='' className="post-cta post-share-cta">
                <i className="fas fa-share"></i>
                Share
            </Link>
        </div>
    </section>
    );
}

export default PostCta;