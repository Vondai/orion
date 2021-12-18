import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./User.css";
import { useAuth } from '../../contexts/AuthContext';
import ErrorBox from '../Notifications/ErrorBox';

function Login () {

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    async function signInSubmitHandler(e) {
        e.preventDefault();

        let { username, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (!username || !password) {
            return setError('Please enter an username and/or password.');
        }

        try {
            setError('');
            setLoading(true);
            let result = await signIn(username, password);
            setLoading(false);
            if (result.status === 'Error') {
                return setError(result.message);
            }
            navigate('/');

        } catch (error) {
            setError("Failed to sign in.");
            setLoading(false);
        }
    }
    
    return (
        <section className='account-section'>
        <p className='account-title'>Login</p>
        {error && <ErrorBox message={error} />}
        <form className='account-form' onSubmit={signInSubmitHandler}>
            <fieldset className='account-form-credentials'>
                <label htmlFor='username'>Username</label>
                <input id='username' placeholder='ex.John' type='text' name='username' />
            </fieldset>
            <fieldset className='account-form-credentials'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' />
            </fieldset>
            <section>
                <p className='account-redirect'>New to Orion? <Link to='/signup'><span className='account-redirect-hightlight'>Sign Up</span></Link></p>
            </section>
            <button className='account-form-cta' type='submit' disabled={loading}>Log In</button>
        </form>
        </section>
    );
}

export default Login;