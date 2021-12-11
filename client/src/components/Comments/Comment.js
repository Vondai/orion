import "./Comment.css";

function Comment () {

    return (
        <div className='comment'>
            <section className='comment-info-wrapper'>
                <p className='comment-info-author'>
                    SomeUsername
                </p>
                <p className='comment-info-time'>
                    5hr. ago
                </p>
            </section>
            <section className='comment-content-wrapper'>
                <p className='comment-content-text'>
                    Lorem ipsum dolor amet.
                </p>
            </section>
        </div>
    );
}

export default Comment;