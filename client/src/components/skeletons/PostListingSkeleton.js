import "./PostListingSkeleton.css";

function PostListingSkeleton() {
  return (
    <div className="post-skeleton">
      <div className="skeleton-container img-skeleton-container">
        <img alt="" className="skeleton-container post-img-skeleton" />
      </div>
      <div className="post-info-skeleton">
        <div className="skeleton-container title-skeleton"></div>
        <div className="skeleton-container additional-info-skeleton"></div>
        <div className="skeleton-container cta-skeleton"></div>
      </div>
    </div>
  );
}

export default PostListingSkeleton;
