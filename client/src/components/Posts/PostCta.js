import { Link } from "react-router-dom";
import "./PostCta.css";

function PostCta () {

    return (
        <section className='post-cta-wrapper'>
        <div className='post-comment-wrapper'>
            <Link to='/lorem/comments' className="post-cta post-comment-cta">
                <i className="fas fa-comments"></i>
                10 Comments
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