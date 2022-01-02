import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";
import NotificationModal from "../Notifications/NotficationModal";
import Footer from "../Footer/Footer";
import PostCta from "./PostCta";
import Comment from "../Comments/Comment";
import "./Post.css";

function Post() {
  const { isAuthenticated, token } = useAuth();
  const sortingPicker = useRef();
  const { communityName, postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    postService.getById(postId).then((data) => {
      setPost(data);
    });
  }, [postId, comments]);

  useEffect(() => {
    commentService
      .get(postId)
      .then((commentsData) => {
        setComments(commentsData);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  function commentSubmitHandler(e) {
    e.preventDefault();
    const { comment } = Object.fromEntries(new FormData(e.currentTarget));
    if (!comment) return;
    setLoading(true);
    commentService.create(comment, postId, token).then((data) => {
      setComments((oldComments) => [data, ...oldComments]);
      setLoading(false);
      setNotificationMessage('Successfully added a comment.');
    });
    e.currentTarget.reset();
  }
  function sortingClickBtnHandler(e) {
    sortingPicker.current.classList.toggle("active");
  }

  const leaveCommentArea = (
    <section className="post-leave-comment-wrapper">
      <form className="post-leave-comment-form" onSubmit={commentSubmitHandler}>
        <label htmlFor="leave-comment">Leave a comment</label>
        <textarea
          id="leave-comment"
          className="post-leave-comment"
          rows="10"
          cols="10"
          name="comment"
          onChange={(e) =>
            e.target.value ? setLoading(false) : setLoading(true)
          }
        ></textarea>
        <button className="leave-comment-cta" type="submit" disabled={loading}>
          Comment
        </button>
      </form>
    </section>
  );
  const guestNavigation = (
    <section className="post-comment-anonymous">
      <span className="post-comment-anonymous-text">
        Log in or sign up to leave a comment
      </span>
      <div className="post-comment-cta-wrapper">
        <button className="post-comment-login">
          <Link to="/login">Log in</Link>
        </button>
        <button className="post-comment-signup">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </section>
  );
  const noCommentsSection = (
    <div className="no-comments-wrapper">
      <i className="fas fa-comments"></i>
      <p className="no-comments-text">No Comments Yet</p>
      <p className="no-comments-info">Be the first to share what you think!</p>
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
        <NotificationModal message={notificationMessage} />
        <PostCta
          commentsCount={post.commentsCount}
          postId={post.id}
          communityName={communityName}
        />
        {isAuthenticated ? leaveCommentArea : guestNavigation}
        <section className="post-comments-sorting-wrapper">
          <div className="comments-sorting-picker">
            <button
              className="comments-sorting-btn"
              type="button"
              onClick={sortingClickBtnHandler}
              onBlur={sortingClickBtnHandler}
            >
              <span className="comments-sorting-text">Sort by: Best</span>
            </button>
            <i className="fas fa-sort-down"></i>
          </div>
          <div className="sorting-picker" ref={sortingPicker}>
            <Link to="?sort=best" className="sorting-item">
              <button className="sorting-item-btn">Best</button>
            </Link>
            <Link to="?sort=top" className="sorting-item">
              <button className="sorting-item-btn">Top</button>
            </Link>
            <Link to="?sort=new" className="sorting-item">
              <button className="sorting-item-btn">New</button>
            </Link>
            <Link to="?sort=old" className="sorting-item">
              <button className="sorting-item-btn">Old</button>
            </Link>
          </div>
        </section>
        <section className="post-comments-wrapper">
          {post.commentsCount === 0
            ? noCommentsSection
            : comments.map((x) => <Comment key={x.id} comment={x} />)}
        </section>
      </section>
      <div className="side-wrapper">
        <Footer />
      </div>
    </main>
  );
}

export default Post;
