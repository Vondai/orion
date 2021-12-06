import { Link } from 'react-router-dom';
function Login () {
    
    return (
        <section className='account-section'>
        <p className='account-title'>Login</p>
        <form className='account-form'>
            <fieldset className='account-form-credentials'>
                <label htmlFor='username'>Username</label>
                <input id='username' placeholder='ex.John' type='text'></input>
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password'></input>
            </fieldset>
            <section>
                <p className='account-redirect'>New to Orion? <Link to='/register'><span className='account-redirect-hightlight'>Sign Up</span></Link></p>
            </section>
            <button className='account-form-cta' type='submit'>Log In</button>
        </form>
        </section>
    );
}

export default Login;