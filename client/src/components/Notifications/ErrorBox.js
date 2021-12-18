import './ErrorBox.css';

function ErrorBox ({message}) {

    return (
        <div className='error-box-container'>
            <span className='error-box-content'>
                {message}
            </span>
        </div>
    )
}

export default ErrorBox;