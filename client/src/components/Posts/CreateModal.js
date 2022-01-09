import ErrorBox from '../Notifications/ErrorBox';
import './CreateModal.css';

function CreateModal({ 
        open,
        onClose,
        createPostSubmitHandler,
        postError,
        loading }) {

    if (!open) return null;
    return (
        <>
        <div className='overlay'></div>
        <div className='create-post-wrapper'>
            <ErrorBox message={postError} />
            <div className='close-cta-wrapper'>
                <button onClick={onClose} disabled={loading}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <form className='create-post-form' onSubmit={createPostSubmitHandler}>
                <div className='create-post-title-wrapper'>
                    <fieldset className='create-post-title'>
                        <label htmlFor='title'>Post title</label>
                        <input id='title' type='text' name='title' />
                    </fieldset>
                </div>
                <div className='create-post-content-wrapper'>
                    <fieldset className='create-post-content'>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content' type='password' name='content' rows='10'></textarea>
                    </fieldset>
                </div>
                <div className='create-cta-wrapper'>
                    <button className='create-form-cta' type='submit' disabled={loading}>Create</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default CreateModal;