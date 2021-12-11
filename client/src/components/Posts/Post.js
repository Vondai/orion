import { Link } from "react-router-dom";
import "./Post.css";
import Footer from "../Footer/Footer";
import PostCta from "./PostCta";
import Comment from "../Comments/Comment";

function Post () {

    return (
        <main className='post'>
            <section className='post-content'>
                <section className='post-info-wrapper'>
                    <div className='post-author-wrapper'>
                        <p className='post-listing-author-content'>Posted by <Link to='/user/lorem'>user/lorem</Link>
                        </p>
                    </div>
                    <div className='post-listing-posted-wrapper'>
                        <p className='post-listing-posted-content'>
                            Posted 8h ago.
                        </p>
                    </div>
                </section>
                <div className='post-title-wrapper'>
                    <p className='post-title-text'>
                        Lorem ipsum dolor amet
                    </p>
                </div>
                <article className='post-content-wrapper'>
                    <p className='post-content-text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices viverra magna, in pulvinar risus tristique a. Curabitur facilisis ornare quam vitae blandit. Suspendisse sit amet eleifend massa. Pellentesque eu blandit arcu, ut aliquam magna. Donec interdum felis nulla, quis suscipit neque mollis id. Fusce posuere lobortis nisl imperdiet suscipit.
                    </p>
                </article>
                <PostCta />
                <section className='post-leave-comment-wrapper'>
                    <label htmlFor='leave-comment'>Leave a comment</label>
                    <textarea id='leave-comment' className='post-leave-comment' rows='12' cols='10'>
                    </textarea>
                </section>
                <section className='post-comments-wrapper'>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </section>
            </section>
            <div>
                <Footer />
            </div>
        </main>

    );
}

export default Post;