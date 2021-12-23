import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as postService from "../../services/postService";
import Footer from "../Footer/Footer";
import PostCta from "./PostCta";
import Comment from "../Comments/Comment";
import "./Post.css";

function Post() {
  const { communityName, postId } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    postService.getById(postId).then((data) => {
      setPost(data);
    });
  }, [postId]);
  return (
    <main className="post">
      <section className="post-content">
        <section className="post-info-wrapper">
          <div className="post-author-wrapper">
            <p className="post-listing-author-content">
              Posted by <Link to={`/user/${post.authorName}`}>user/{post.authorName}</Link>
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
          <p className="post-content-text">
            {post.description}
          </p>
        </article>
        <PostCta 
            commentsCount={post.commentsCount}
            postId={post.id}
            communityName={communityName}/>
        <section className="post-leave-comment-wrapper">
          <label htmlFor="leave-comment">Leave a comment</label>
          <textarea
            id="leave-comment"
            className="post-leave-comment"
            rows="12"
            cols="10"
          ></textarea>
        </section>
        <section className="post-comments-wrapper">
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
