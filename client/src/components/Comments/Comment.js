import "./Comment.css";

function Comment ({ comment }) {

    return (
        <div className='comment'>
            <section className='comment-info-wrapper'>
                <p className='comment-info-author'>
                    {comment.author}
                </p>
                <p className='comment-info-time'>
                    {comment.createdOn}
                </p>
            </section>
            <section className='comment-content-wrapper'>
                <p className='comment-content-text'>
                    {comment.content}
                </p>
            </section>
        </div>
    );
}

export default Comment;