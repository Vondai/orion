import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as postService from "../../services/postService";
import Footer from "../Footer/Footer";
import PostCta from "./PostCta";
import Comment from "../Comments/Comment";
import "./Post.css";

function Post() {
  const { isAuthenticated } = useAuth();

  const { communityName, postId } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    postService.getById(postId).then((data) => {
      setPost(data);
    });
  }, [postId]);

  const leaveCommentArea = (
    <section className="post-leave-comment-wrapper">
      <label htmlFor="leave-comment">Leave a comment</label>
      <textarea
        id="leave-comment"
        className="post-leave-comment"
        rows="10"
        cols="10"
      ></textarea>
    </section>
  );
  const guestNavigation = (
    <section className="post-comment-anonymous">
      <span className="post-comment-anonymous-text">
        Log in or sign up to leave a comment
      </span>
      <div className="post-comment-cta-wrapper">
        <button className="post-comment-login"><Link to="/login">Log in</Link></button>
        <button className="post-comment-signup"><Link to="/signup">Sign up</Link></button>
      </div>
    </section>
  );
  const noCommentsSection = (
    <div className='no-comments-wrapper'>
      <i className="fas fa-comments"></i>
      <p className='no-comments-text'>No Comments Yet</p>
      <p className='no-comments-info'>Be the first to share what you think!</p>
    </div>
  );
  return (
    <main className="post">
      <section className="post-content">
        <section className="post-info-wrapper">
          <div className="post-author-wrapper">
            <p className="post-listing-author-content">
              Posted by{" "}
              <Link to={`/user/${post.authorName}`}>
                user/{post.authorName}
              </Link>
            </p>
          </div>
          <div className="post-listing-posted-wrapper">
            <p className="post-listing-posted-content">
              Posted {post.createdOn}.
            </p>
          </div>
        </section>
        <div className="post-title-wrapper">
          <p className="post-title-text">{post.title}</p>
        </div>
        <article className="post-content-wrapper">
          <p className="post-content-text">{post.description}</p>
        </article>
        <PostCta
          commentsCount={post.commentsCount}
          postId={post.id}
          communityName={communityName}
        />
        {isAuthenticated ? leaveCommentArea : guestNavigation}
        <section className='post-comments-sorting-wrapper'>
          <div className='comments-sorting-picker'>
            <button className='comments-sorting-btn' type='button'>
              <span className='comments-sorting-text'>Sort by: Best</span>
            </button>
            <i className="fas fa-sort-down"></i>
          </div>
        </section>
        <div className='sorting-picker'>
          <button className='sorting-item'><Link to='?sort=Best'>Best</Link></button>
          <button className='sorting-item'><Link to='?sort=Best'>Top</Link></button>
          <button className='sorting-item'><Link to='?sort=new'>New</Link></button>
          <button className='sorting-item'><Link to='?sort=old'>Old</Link></button>
        </div>
        <section className="post-comments-wrapper">
          {post.commentsCount === 0 ? 
          noCommentsSection :
          < Comment />}
        </section>
      </section>
      <div className='side-wrapper'>
        <Footer />
      </div>
    </main>
  );
}

export default Post;
